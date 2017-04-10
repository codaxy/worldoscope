import {Controller} from 'cx/ui';
import {queryCountryIndicators} from 'api/data';

export default class extends Controller {
  onInit() {
    this.load();
  }

  load() {
    let indicatorId = this.store.get('$section.indicator.id');
    let fromYear = this.store.get('$section.fromYear');
    let toYear = this.store.get('$section.toYear');
    let regionId = this.store.get('$section.region.id');

    if (indicatorId && fromYear && toYear) {
      this.store.set('$sectionData.loading', true);

      let params = {
        date: `${fromYear}:${toYear}`,
      };

      let options = {
        filter: {
          region: regionId,
        },
      };

      queryCountryIndicators('all', indicatorId, params, options).then(data => {
        let results = {};
        data.forEach(x => {
          let c = x.country;
          let r = results[c.id];
          if (!r)
            r = (results[c.id] = {
              country: c.value,
              trend: [],
            });

          if (x.value !== null) {
            r[String(x.date)] = Number(x.value);
            r.trend.push({
              x: Number(x.date),
              y: Number(x.value),
            });
          }
        });

        this.store.set(
          '$sectionData.data',
          Object.keys(results).map(k => results[k]),
        );
        this.store.set('$sectionData.loading', false);
      });
    }
  }
}

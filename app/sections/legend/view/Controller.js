import {Controller} from 'cx/ui';
import {queryCountryIndicators} from 'api/data';

export default class extends Controller {
  onInit() {
    this.load();
  }

  load() {
    let indicatorId = this.store.get('$section.indicator.id');
    let year = this.store.get('$section.year');
    let region = this.store.get('$section.region.id');

    if (indicatorId && year) {
      this.store.set('$sectionData.loading', true);

      queryCountryIndicators(
        'all',
        indicatorId,
        {
          date: year,
        },
        {
          filter: {region: region},
        },
      ).then(data => {
        this.store.set('$sectionData.loading', false);
        this.store.set(
          '$sectionData.values',
          data.map(c => ({
            id: c.country.id,
            country: c.country.value,
            value: c.value,
          })),
        );
      });
    }
  }
}

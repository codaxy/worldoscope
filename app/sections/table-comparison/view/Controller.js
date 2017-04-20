import { Controller } from "cx/ui";
import { queryCountryIndicators } from "api/data";
import { StringTemplate } from "cx/data";

export default class extends Controller {
	onInit() {
		this.load();

		this.addComputable('$sectionData.title', ['$section'], s => {
			try {
				let format = StringTemplate.get(s.title);
				return format({
					topic: s.topic.text,
					indicators: Array.isArray(s.indicators) && s.indicators.map(a=>a.text).join(', ') || null,
					region: s.region && s.region.name || null,
					year: s.year
				});
			} catch(e) {
				return s.title;
			}
		})
	}

	load() {
		let indicators = this.store.get("$section.indicators");
		let year = this.store.get("$section.year");
		let regionId = this.store.get("$section.region.id");

		if (Array.isArray(indicators) && indicators.length > 0) {
			this.store.set("$sectionData.loading", true);

			let params = {
				date: `${year}`
			};

			let options = {
				filter: {
					region: regionId
				}
			};

			let results = {};

			let promises = indicators.map(ind => {
				return queryCountryIndicators(
					"all",
					ind.id,
					params,
					options
				).then(data => {
					data.forEach(x => {
						let c = x.country;
						let r = results[c.id];
						if (!r)
							r = results[c.id] = {
								country: c.value
							};

						if (x.value !== null)
							r["_" + ind.id.replace(/\./g, "_")] = Number(x.value);
					});
				});
			});

			Promise.all(promises).then(() => {
				this.store.set(
					"$sectionData.data",
					Object.keys(results).map(k => results[k])
				);
				this.store.set("$sectionData.loading", false);
			});
		}
	}
}

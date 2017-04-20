import { Controller } from "cx/ui";
import { queryCountryIndicators } from "api/data";
import { detectFormat } from "app/util";
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
					countries: Array.isArray(s.countries) && s.countries.map(a=>a.text).join(', ') || null,
					region: s.region && s.region.name || null,
					year: s.year
				});
			} catch(e) {
				return s.title;
			}
		})
	}

	load() {
		let { year, indicators, countries } = this.store.get("$section");

		if (indicators && year && countries) {
			this.store.set("$sectionData.loading", true);

			let options = {};

			let params = {
				date: year
			};

			let promises = [];

			let data = countries.map(country => {
				let values = indicators.map((indicator, i) => {
					let promise = queryCountryIndicators(
						country.id,
						indicator.id,
						params,
						options
					).then(data => {
						values[i] = data[0];
					});
					promises.push(promise);
					return null;
				});
				return {
					values,
					active: true
				};
			});

			Promise.all(promises).then(() => {
				this.store.set("$sectionData.indicators", data);
				this.store.set("$sectionData.loading", false);
			});
		}
	}
}

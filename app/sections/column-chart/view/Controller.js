import { Controller } from "cx/ui";
import { queryCountryIndicators } from "api/data";
import { detectFormat } from "app/util";

export default class extends Controller {
	onInit() {
		this.load();
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

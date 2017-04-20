import { Controller } from "cx/ui";
import { queryCountryIndicators } from "api/data";

export default class extends Controller {
	onInit() {
		this.load();
	}

	load() {
		let indicators = this.store.get("$section.indicators");
		let fromYear = this.store.get("$section.fromYear");
		let toYear = this.store.get("$section.toYear");
		let country = this.store.get("$section.country");

		if (
			Array.isArray(indicators) &&
			fromYear &&
			toYear &&
			country &&
			indicators.length > 0
		) {
			this.store.set("$sectionData.loading", true);

			let promises = indicators.map(ind => {
				return queryCountryIndicators(country.id, ind.id, {
					date: `${fromYear}:${toYear}`
				}).then(data => ({
					id: ind.id,
					active: true,
					name: ind.text,
					values: data.map(p => ({
						year: Number(p.date),
						value: p.value !== null ? Number(p.value) : null
					}))
				}));
			});

			Promise.all(promises).then(list => {
				this.store.set("$sectionData.indicators", list);
				this.store.set("$sectionData.loading", false);
			});
		}
	}
}

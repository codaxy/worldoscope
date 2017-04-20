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
					indicator: s.indicator.name,
					region: s.region && s.region.name || null,
					countries: Array.isArray(s.countries) && s.countries.map(a=>a.text).join(', ') || null,
					period: `${s.fromYear} - ${s.toYear}`
				});
			} catch(e) {
				return s.title;
			}
		})
	}

	load() {
		let indicatorId = this.store.get("$section.indicator.id");
		let fromYear = this.store.get("$section.fromYear");
		let toYear = this.store.get("$section.toYear");
		let countries = this.store.get("$section.countries");

		if (
			indicatorId &&
			fromYear &&
			toYear &&
			countries &&
			countries.length > 0
		) {
			this.store.set("$sectionData.loading", true);

			let promises = countries.map(c =>
				queryCountryIndicators(c.id, indicatorId, {
					date: `${fromYear}:${toYear}`
				})
			);

			Promise.all(promises).then(countryResults => {
				let countryData = {};
				countryResults.forEach(cr => {
					cr.forEach(c => {
						let cd = countryData[c.country.id];
						if (!cd)
							cd = countryData[c.country.id] = {
								id: c.country.id,
								name: c.country.value,
								values: [],
								active: true
							};
						if (c.value !== null) {
							cd.values.push({
								year: Number(c.date),
								value: Number(c.value)
							});
						}
					});
				});

				this.store.set(
					"$sectionData.countries",
					Object.keys(countryData).map(k => countryData[k])
				);
				this.store.set("$sectionData.loading", false);
			});
		}
	}
}

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
					countries: Array.isArray(s.countries) && s.countries.map(a=>a.text).join(', ') || null,
					region: s.region && s.region.name || null
				});
			} catch(e) {
				return s.title;
			}
		});

		this.load();
	}

	load() {
		let indicatorId = this.store.get("$section.indicator.id");
		let year = this.store.get("$section.year");
		let region = this.store.get("$section.region.id");

		if (indicatorId && year) {
			this.store.set("$sectionData.loading", true);

			queryCountryIndicators(
				"all",
				indicatorId,
				{
					date: year
				},
				{
					filter: { region: region }
				}
			).then(data => {
				this.store.set("$sectionData.loading", false);
				this.store.set(
					"$sectionData.values",
					data.map(c => ({
						id: c.country.id,
						country: c.country.value,
						value: c.value
					}))
				);
			});
		}
	}
}

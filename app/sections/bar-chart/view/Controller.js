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
					indicator: s.indicator.name,
					region: s.region && s.region.name || null,
					year: s.year,
					top: s.top
				});
			} catch(e) {
				return s.title;
			}
		})
	}

	load() {
		let { top, year, invert } = this.store.get("$section");
		let indicatorId = this.store.get("$section.indicator.id");
		let regionId = this.store.get("$section.region.id");

		if (indicatorId && year) {
			this.store.set("$sectionData.loading", true);

			let options = {
				sort: true,
				ascending: invert,
				take: top || 30,
				filter: {
					region: regionId
				}
			};

			let params = {
				date: year
			};

			queryCountryIndicators(
				"all",
				indicatorId,
				params,
				options
			).then(data => {
				this.store.set(
					"$sectionData.values",
					data.map(c => ({
						id: c.country.id,
						country: c.country.value,
						value: c.value
					}))
				);

				this.store.set("$sectionData.loading", false);
			});
		}
	}
}

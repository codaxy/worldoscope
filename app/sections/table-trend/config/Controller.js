import { Controller } from "cx/ui";
import { queryTopics, queryTopicIndicators, queryRegions } from "api/data";

export default class extends Controller {
	onInit() {
		this.store.init({
			fromYear: 2005,
			toYear: 2015
		});

		this.addTrigger(
			"fromYear",
			["fromYear"],
			fy => {
				let ty = this.store.get("toYear");
				if (fy + 10 < ty) this.store.set("toYear", fy + 10);
				if (ty < fy) this.store.set("toYear", fy);
			},
			true
		);

		this.addTrigger(
			"toYear",
			["toYear"],
			ty => {
				let fy = this.store.get("fromYear");
				if (fy + 10 < ty) this.store.set("fromYear", ty - 10);
				if (ty < fy) this.store.set("fromYear", ty);
			},
			true
		);
	}

	queryTopics(q) {
		return queryTopics(q);
	}

	queryRegions(q) {
		return queryRegions(q);
	}

	queryTopicIndicators(q) {
		let topicId = this.store.get("topic.id");
		if (!topicId) return [];
		return queryTopicIndicators(topicId, q);
	}
}

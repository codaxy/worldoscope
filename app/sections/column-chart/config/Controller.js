import { Controller } from "cx/ui";
import { queryTopics, queryTopicIndicators } from "api/data";

export default class extends Controller {
	onInit() {}

	queryTopics(q) {
		return queryTopics(q);
	}

	queryTopicIndicators(q) {
		let topicId = this.store.get("topic.id");
		if (!topicId) return [];
		return queryTopicIndicators(topicId, q);
	}
}

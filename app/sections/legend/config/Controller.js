import { Controller } from 'cx/ui';
import {queryTopics, queryTopicIndicators, queryRegions, queryCountries} from 'api/data';

export default class extends Controller {
    onInit() {

    }

    queryTopics(q) {
        return queryTopics(q);
    }

    queryRegions(q) {
        return queryRegions(q);
    }

    queryTopicIndicators(q) {
        let topicId = this.store.get('topic.id');
        if (!topicId)
            return [];
        return queryTopicIndicators(topicId, q);
    }

    queryCountries() {
        let regionId = this.store.get('region.id');
        return queryCountries(regionId);
    }
}
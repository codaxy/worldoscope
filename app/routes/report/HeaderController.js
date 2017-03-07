import { Controller } from 'cx/ui';
import {queryTopics, queryTopicIndicators, queryCountries } from 'api/data';

export default class extends Controller {
    queryTopics(q) {
        return queryTopics(q);
    }

    queryTopicIndicators(q) {
        let topicId = this.store.get('defaults.topic.id');
        if (!topicId)
            return [];
        return queryTopicIndicators(topicId, q);
    }

    queryCountries(q) {
        return queryCountries(q);
    }
}
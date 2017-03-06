import { Controller } from 'cx/ui';
import {queryTopics, queryTopicIndicators, queryCountries } from 'api/data';

export default class extends Controller {
    init() {
        super.init();

        this.addTrigger('name', ['params.indicator.name'], name => {
            this.store.set('title', name);
        })
    }

    queryTopics(q) {
        return queryTopics(q);
    }

    queryTopicIndicators(q) {
        let topicId = this.store.get('params.topic.id');
        if (!topicId)
            return [];
        return queryTopicIndicators(topicId, q);
    }

    queryCountries(q) {
        return queryCountries(q);
    }
}
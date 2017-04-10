import {Controller} from 'cx/ui';
import {queryTopics, queryTopicIndicators, queryRegions} from 'api/data';

export default class extends Controller {
  onInit() {
    this.addTrigger(
      'name',
      ['indicator.name', 'year', 'top'],
      (name, year, top) => {
        this.store.set('title', `Top ${top} - ${name} - ${year}`);
      },
    );
  }

  queryTopics(q) {
    return queryTopics(q);
  }

  queryRegions(q) {
    return queryRegions(q);
  }

  queryTopicIndicators(q) {
    let topicId = this.store.get('topic.id');
    if (!topicId) return [];
    return queryTopicIndicators(topicId, q);
  }
}

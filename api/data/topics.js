import {wbFetch} from './wbFetch';

export function getTopics() {
  return fetch('topics');
}

let topics, topicIndicators = {};

export async function queryTopics(q) {
  if (!topics) {
    let result = await wbFetch('topics');
    topics = result[1];
  }
  return topics;
}

export async function queryTopicIndicators(topicId, q) {
  if (!topicIndicators[topicId]) {
    let result = await wbFetch(`topic/${topicId}/indicator`, {
      per_page: 1000,
    });
    topicIndicators[topicId] = result[1];
  }
  return topicIndicators[topicId];
}

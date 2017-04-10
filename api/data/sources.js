import {wbFetch} from './wbFetch';

export function getSources() {
  return wbFetch('sources');
}

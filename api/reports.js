import {withDatabase, currentUserId} from './db';
import uid from 'uid';
import {sorter} from 'cx/data';

export function addReport(report) {
  let id = uid();
  return saveReport(id, report);
}

export function loadReport(id) {
  return withDatabase(database =>
    database.ref('reports/' + id).once('value').then(x => x.val()));
}

export function saveReport(id, report) {
  let data = Object.assign({}, report, {
    id: id,
  });
  return withDatabase(database =>
    database.ref(`reports/${id}`).set(data).then(x => data));
}

export function deleteReport(id) {
  return withDatabase(database => database.ref(`reports/${id}`).remove());
}

export function getPublicReports(page = 1, pageSize = 100) {
  return withDatabase(database =>
    database
      .ref('gallery')
      .orderByChild('starCount')
      .limitToLast(pageSize)
      .once('value')
      .then(x => {
        let v = x.val() || {};
        return (x = sorter([{value: x => x.starCount, direction: 'DESC'}])(
          Object.keys(v).map(k => v[k]),
        ));
      }));
}

export function getMyReports() {
  return withDatabase(database =>
    database
      .ref('reports')
      .orderByChild('userId')
      .equalTo(currentUserId())
      .once('value')
      .then(x => {
        let v = x.val() || {};
        return Object.keys(v).map(k =>
          Object.assign({}, v[k], {
            key: k,
          }));
      }));
}

export function runHealthCheckOnReport(id) {
	return withDatabase(database =>
		database
			.ref(`healthCheck/${id}`)
			.set(true));
}

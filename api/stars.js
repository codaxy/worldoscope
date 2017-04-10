import {withDatabase, currentUserId} from './db';
import {loadReport} from './reports';

export function addStar(reportId) {
  return loadReport(reportId).then(report =>
    withDatabase(database => {
      let x = database.ref('stars').child(reportId).child(currentUserId()).set({
        starDate: new Date().toISOString(),
      });

      let y = database
        .ref('users')
        .child(currentUserId())
        .child('starred')
        .child(reportId)
        .set({
          id: reportId,
          title: report.title,
          date: new Date().toISOString(),
        });

      return Promise.all([x, y]);
    }));
}

export function removeStar(reportId) {
  return withDatabase(database => {
    let x = database
      .ref('stars')
      .child(reportId)
      .child(currentUserId())
      .remove();

    let y = database
      .ref('users')
      .child(currentUserId())
      .child('starred')
      .child(reportId)
      .remove();

    return Promise.all([x, y]);
  });
}

export function isStarred(reportId) {
  return withDatabase(database =>
    database
      .ref('stars')
      .child(reportId)
      .child(currentUserId())
      .once('value')
      .then(x => !!x.val()));
}

export function getMyStars(reportId) {
  return withDatabase(database => {
    if (!currentUserId()) return Promise.resolve(null);

    return database
      .ref('users')
      .child(currentUserId())
      .child('starred')
      .once('value')
      .then(x => {
        let data = x.val() || {};
        return Object.keys(data).map(k => data[k]);
      });
  });
}

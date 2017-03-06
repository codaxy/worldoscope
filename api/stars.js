import { database, currentUserId } from './db';
import { loadReport } from './reports';

let stars = database.ref('stars');

export function addStar(reportId) {
    return loadReport(reportId)
        .then((report) => {
            let x = stars.child(reportId).child(currentUserId()).set({
                starDate: new Date().toISOString()
            });

            let y = database.ref('users')
                .child(currentUserId())
                .child('starred')
                .child(reportId)
                .set({
                    id: reportId,
                    title: report.title,
                    date: new Date().toISOString()
                });

            return Promise.all([x, y]);
        });
}

export function removeStar(reportId) {
    let x = stars.child(reportId).child(currentUserId()).remove();

    let y = database.ref('users')
        .child(currentUserId())
        .child('starred')
        .child(reportId)
        .remove();

    return Promise.all([x, y]);
}

export function isStarred(reportId) {
    return stars
        .child(reportId)
        .child(currentUserId())
        .once('value')
        .then(x => !!x.val());
}

export function getMyStars(reportId) {
    if (!currentUserId())
        return Promise.resolve(null);

    return database.ref('users')
        .child(currentUserId())
        .child('starred')
        .once('value')
        .then(x => {
            let data = x.val() || {};
            return Object.keys(data)
                .map(k => data[k]);
        });
}
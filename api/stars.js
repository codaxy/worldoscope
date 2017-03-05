import { database, auth } from './db';
import { loadReport } from './reports';
import uid from 'uid';

let stars = database.ref('stars');

export function addStar(reportId) {
    return loadReport(reportId)
        .then((report) => {
            let x = stars.child(reportId).child(auth.currentUser.uid).set({
                active: true,
                lastChange: new Date().toISOString()
            });

            let y = database.ref('users')
                .child(auth.currentUser.uid)
                .child('starred')
                .child(reportId)
                .set({
                    id: reportId,
                    title: report.title,
                    starDate: new Date().toISOString()
                });

            return Promise.all([x, y]);
        });
}

export function removeStar(reportId) {

}

export function isStarred(reportId) {
    return stars
        .child(reportId)
        .child(auth.currentUser.uid)
        .once('value')
        .then(x => x && x.active === true);
}


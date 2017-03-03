import { database } from './db';
import uid from 'uid';

let reports = database.ref('reports');

export function addReport(report) {
    let id = uid();
    return saveReport(id, report);
}

export function loadReport(id) {
    return database.ref('reports/' + id)
        .once('value')
        .then(x => x.val());
}

export function saveReport(id, report) {
    return database.ref(`reports/${id}`)
        .set(report).key;
}

export function getPublicReports() {
    return reports
        .orderByChild('public').equalTo(true)
        .once('value')
        .then(x => {
            let v = x.val() || {};
            return Object.keys(v).map(k => Object.assign({}, v[k], {
                key: k
            }));
        });
}

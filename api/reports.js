import { database, currentUserId } from './db';
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
    let data = Object.assign({}, report, {
        id: id
    });
    return database.ref(`reports/${id}`)
        .set(data)
        .then(x => data);
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

export function getMyReports() {
    return reports
        .orderByChild('userId').equalTo(currentUserId())
        .once('value')
        .then(x => {
            let v = x.val() || {};
            return Object.keys(v).map(k => Object.assign({}, v[k], {
                key: k
            }));
        });
}

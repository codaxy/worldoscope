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

export function deleteReport(id) {
    return database.ref(`reports/${id}`)
        .remove();
}

export function getPublicReports(page = 1, pageSize = 100) {
    return database.ref('gallery')
        .orderByChild('starCount')
        .limitToLast(pageSize)
        .once('value')
        .then(x => {
            let v = x.val() || {};
            return _.orderBy(Object.keys(v).map(k => v[k]), "starCount", "desc");
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

'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.addStar = functions.database.ref("/stars/{reportId}/{userId}").onWrite((event) => {
    let repStarsRef = event.data.ref.parent;
    let reportId = event.params.reportId;
    let countRef = repStarsRef.parent.parent.child(`gallery/${reportId}/starCount`);

    countRef.once('value', data => {
        if (!data.exists())
            return null;

        return repStarsRef.once('value', stars => countRef.set(stars ? stars.numChildren() : 0));
    });
});

exports.addToGallery = functions.database.ref("/reports/{reportId}").onWrite((event) => {
    let reportRef = event.data.ref;
    let reportId = event.params.reportId;
    let sampleRef = reportRef.parent.parent.child(`/gallery/${reportId}`);

    return reportRef.once('value', rep => {
        let report = rep.val();
        if (report.public) {
            if (!sampleRef.exists()) {
                return functions.database
                    .ref(`/stars/${reportId}`)
                    .once("value", stars => sampleRef.set({
                        id: reportId,
                        title: report.title,
                        description: report.description,
                        starCount: stars ? stars.numChildren() : 0
                    }));
            }
            else {
                return sampleRef.update({
                    "title": report.title,
                    "description": report.description
                });
            }
        }
        else if (sampleRef.exists())
            return sampleRef.remove();
    });
});
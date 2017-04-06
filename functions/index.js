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

// exports.addToGallery = functions.database.ref("/reports/{reportId}").onWrite((event) => {
//     let reportRef = event.data.ref;
//     let reportId = event.params.reportId;
//     let sampleRef = reportRef.parent.parent.child(`/gallery/${reportId}`);
//     let starsRef = reportRef.parent.parent.child(`/stars/${reportId}`);
//
//     return reportRef.once('value', rep => {
//         let report = rep.val();
//
//         return sampleRef.once('value', sample => {
//             if (sample.exists()) {
//                 if (!report.public)
//                     return sampleRef.remove();
//
//                 return sampleRef.update({
//                     "title": report.title || null,
//                     "description": report.description || null
//                 });
//             }
//
//             return starsRef.once('value', stars => sampleRef.set({
//                 id: reportId,
//                 title: report.title || null,
//                 description: report.description || null,
//                 starCount: stars ? stars.numChildren() : 0
//             }));
//         });
//     });
// });

exports.addToGallery2 = functions.database.ref("/reports/{reportId}/public").onWrite((event) => {
    let publicRef = event.data.ref;
    let reportRef = publicRef.parent;
    let reportId = event.params.reportId;
    let sampleRef = reportRef.parent.parent.child(`/gallery/${reportId}`);
    let starsRef = reportRef.parent.parent.child(`/stars/${reportId}`);

    return reportRef.once('value', rep => {
        let report = rep.val();

        return sampleRef.once('value', sample => {
            if (sample.exists()) {
                if (!report.public)
                    return sampleRef.remove();

                return sampleRef.update({
                    "title": report.title || null,
                    "description": report.description || null
                });
            }

            return starsRef.once('value', stars => sampleRef.set({
                id: reportId,
                title: report.title || null,
                description: report.description || null,
                starCount: stars ? stars.numChildren() : 0
            }));
        });
    });
});
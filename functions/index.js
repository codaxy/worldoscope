'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.addStar = functions.database.ref("/stars/{reportId}/{userId}").onWrite((event) => {
    let repStarsRef = event.data.ref.parent;
    let reportId = event.params.reportId;
    let countRef = repStarsRef.parent.parent.child(`gallery/${reportId}/starCount`);

    countRef.once('value').then(data => {
        if (!data.exists())
            return null;

        return repStarsRef.once('value').then(stars => countRef.set(stars ? stars.numChildren() : 0));
    });
});

exports.addToGallery = functions.database.ref("/reports/{reportId}").onWrite((event) => {
    let reportRef = event.data.ref;
    let reportId = event.params.reportId;
    let sampleRef = reportRef.parent.parent.child(`gallery/${reportId}`);
    let starsRef = reportRef.parent.parent.child(`stars/${reportId}`);
    let report = event.data.val();

    return sampleRef.once('value').then(sample => {
        if (sample.exists()) {
            if (!report.public)
                return sampleRef.remove();

            let sd = sample.val();
            if (sd.title != report.title || sd.description != report.description)
                return sampleRef.update({
                    "title": report.title || null,
                    "description": report.description || null
                });
            return null;
        }

        return starsRef.once('value').then(stars => sampleRef.set({
            id: reportId,
            title: report.title || null,
            description: report.description || null,
            starCount: stars ? stars.numChildren() : 0
        }));
    });
});


//if reports exists update starCount
//if report doesn't exists remove it from gallery

exports.healthCheck = functions.database.ref("/healthCheck/{reportId}").onWrite((event) => {
	let rootRef = event.data.ref.parent.parent;
	let reportId = event.params.reportId;
	let reportRef = rootRef.child(`report/${reportId}`);
	let sampleRef = rootRef.child(`gallery/${reportId}`);
	let starsRef = rootRef.child(`stars/${reportId}`);

	return reportRef.once('value').then(rep => {
		if (rep.exists()) {
			let report = rep.val();
			return starsRef.once('value').then(stars => sampleRef.set({
				id: reportId,
				title: report.title || null,
				description: report.description || null,
				starCount: stars ? stars.numChildren() : 0
			}));
		}
		else {
			return Promise.all([
				sampleRef.remove(),
				starsRef.remove()
			]);
		}
	}).then(() => {
		//remove itself
		return event.data.ref.remove();
	})
});

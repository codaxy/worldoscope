'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.starAdded = functions.database.ref("/stars/{reportId}/{userId}").onWrite((event) => {
    var collectionRef = event.data.ref.parent;
    var countRef = functions.database.ref("/gallery/{reportId}/starCount");

    if (!countRef.exists())
        return null;

    return collectionRef.once('value', function (stars) {
        return countRef.set(stars ? stars.numChildren() : 0);
    });
});

exports.addToGallery = functions.database.ref("/report/{reportId}").onWrite((event) => {
    var reportRef = event.data.ref;
    var galleryRef = functions.database.ref("/gallery/{reportId}");

    return reportRef.once('value', function (report) {
        if (report.public) {
            if (!galleryRef.exists()) {
                return functions.database.ref("/stars/{reportId}")
                    .once("value", function (stars) {
                        return galleryRef.set({
                            id: report.id,
                            title: report.title,
                            description: report.description,
                            starCount: stars ? stars.numChildren() : 0
                        });
                    })
            }
            else {
                return galleryRef.update({
                    "title": report.title,
                    "description": report.description
                });
            }
        }
        else if (galleryRef.exists())
            return galleryRef.remove();
    });
});
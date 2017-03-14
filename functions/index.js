'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.starAdded = functions.database.ref("/stars/{reportId}/{userId}").onWrite((event) => {
    var collectionRef = event.data.ref.parent;
    var countRef = collectionRef.parent.child('/reports/{reportId}/starCount');

    return collectionRef.once('value', function (reportStars) {
        return countRef.set(reportStars.numChildren());
    });
});


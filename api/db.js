let auth;

export const importFirebase = () => System.import(/* webpackChunkName: "firebase" */"./firebase");

export const getFirebase = () => importFirebase().then(firebase => firebase.firebase);

export const getDatabase = () =>
	importFirebase().then(firebase => firebase.database);

export const getAuth = () =>
	importFirebase().then(firebase => (auth = firebase.auth));

export const currentUserId = () =>
	(auth && auth.currentUser ? auth.currentUser.uid : null);

export function withDatabase(callback) {
	return getDatabase().then(db => callback(db));
}

export function withAuth(callback) {
	return getAuth().then(db => callback(db));
}

export function withFirebase(callback) {
	return getFirebase().then(fb => callback(fb));
}

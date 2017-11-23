import {Controller, History} from "cx/ui";
import {Toast} from "cx/widgets";
import {withFirebase} from "../../../api/db";

export default class extends Controller {

	signInWithGoogle(e) {
		e.preventDefault();
		withFirebase(firebase => {
			let provider = new firebase.auth.GoogleAuthProvider();
			this.signInWithProvider(firebase.auth(), provider);
		})
	}

	signInWithTwitter(e) {
		e.preventDefault();
		withFirebase(firebase => {
			let provider = new firebase.auth.TwitterAuthProvider();
			this.signInWithProvider(firebase.auth(), provider);
		});
	}

	signInWithGitHub(e) {
		e.preventDefault();
		withFirebase(firebase => {
			let provider = new firebase.auth.GithubAuthProvider();
			this.signInWithProvider(firebase.auth(), provider);
		});
	}

	signInWithFacebook(e) {
		e.preventDefault();
		withFirebase(firebase => {
			let provider = new firebase.auth.FacebookAuthProvider();
			this.signInWithProvider(firebase.auth(), provider);
		});
	}

	// signInWithEmail(e) {
	// 	e.preventDefault();
	// 	withFirebase(firebase => {
	// 		let provider = new firebase.auth.EmailAuthProvider();
	// 		this.signInWithProvider(firebase.auth(), provider);
	// 	});
	// }

	signInWithProvider(auth, provider) {
		auth
			.signInWithPopup(provider)
			.then(({user}) => {
				this.store.set("user", {
					email: user.email,
					id: user.uid,
					displayName: user.displayName,
					photoURL: user.photoURL
				});
				History.replaceState({}, null, "~/");
			})
			.catch(error => {
				let errorCode = error.code;
				let errorMessage = error.message;
				let toast = Toast.create({
					message: `Login failed with error code ${errorCode}. ${errorMessage}`,
					timeout: 15000,
					mod: "error"
				});
				toast.open(this.store);
			});

	}

	signOut(e) {
		e.preventDefault();
		withAuth(auth => {
			auth.signOut().then(() => {
				this.store.delete("user");
			});
		});
	}
}

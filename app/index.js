import { Store } from "cx/data";
import { Url, History, Widget, startAppLoop } from "cx/ui";
import { Timing, Debug } from "cx/util";
import { getAuth } from "api";

//css
import "./index.scss";
import "cx-theme-material";

//store
const store = new Store();

//webpack (HMR)
if (module.hot) {
	// accept itself
	module.hot.accept();

	// remember data on dispose
	module.hot.dispose(function(data) {
		data.state = store.getData();
		if (stop) stop();
	});

	//apply data on hot replace
	if (module.hot.data) store.load(module.hot.data.state);
}

//routing

Url.setBaseFromScript("app.js");
History.connect(store, "url");

//debug

Widget.resetCounter();
Timing.enable("app-loop");
Debug.enable("app-data");

// Listen to change in auth state so it displays the correct UI for when
// the user is signed in or not.
store.init("user", { loading: true });
getAuth().then(auth => {
	auth.onAuthStateChanged(function(user) {
		store.set(
			"user",
			user && {
				email: user.email,
				displayName: user.displayName,
				photoURL: user.photoURL,
				uid: user.uid
			}
		);
	});
});

//app loop
import Routes from "./routes";

let stop = startAppLoop(document.getElementById("app"), store, Routes);

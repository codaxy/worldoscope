import { urlEncode } from "app/util/urlEncode";

let callbackId = 0;

export function wbFetch(url, params) {
	// return new Promise((fulfill) => {
	//     let callbackName = `callback${callbackId++}`;
	//     self[callbackName] = fulfill;
	//     let qs = urlEncode({
	//         format: 'jsonp',
	//         prefix: callbackName,
	//         ...params
	//     });
	//     importScripts('http://api.worldbank.org/' + url + '?' + qs);
	//     setTimeout(() => {
	//         delete  self[callbackName];
	//     }, 60 * 1000);
	// });

	let qs = urlEncode({
		format: "json",
		...params
	});

	let options = {};

	// //always use proxy until WB API is fixed
	// let urlBase = window.location.protocol == "https:"
	// 	? "https://api.cxjs.io/worldoscope/"
	// 	: "https://api.worldbank.org/v2/";

	let urlBase = WORLDBANK_URL;

	return fetch(`${urlBase}/${url}?${qs}`, options).then(x => x.json());
}

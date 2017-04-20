import { Controller } from "cx/ui";

export default class extends Controller {
	shareOnTwitter(e) {
		this.share(e, "twitter");
	}

	shareOnFacebook(e) {
		this.share(e, "facebook");
	}

	shareOnGooglePlus(e) {
		this.share(e, "googleplus");
	}

	shareOnLinkedIn(e) {
		this.share(e, "linkedin");
	}

	share(e, medium) {
		e.preventDefault();
		popup(getShareUrl(medium));
		document.activeElement.blur(); //close menu
	}
}

const getShareUrl = medium => {
	let title = encodeURIComponent(document.title);
	let url = encodeURIComponent(window.location);

	switch (medium) {
		case "facebook":
			return `https://www.facebook.com/sharer.php?p[title]=${title}&p[url]=${url}`;

		case "twitter":
			return `https://twitter.com/home?status=${title} ${url}`;

		case "googleplus":
			return `https://plus.google.com/share?${title}`;

		case "linkedin":
			return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
	}
};

const popup = url => {
	let popupWidth = 600,
		popupHeight = 400,
		left = window.innerWidth / 2 - popupWidth / 2,
		top = window.innerHeight / 2 - popupHeight / 2;

	return window.open(
		url,
		"targetWindow",
		"toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=" +
			popupWidth +
			", height=" +
			popupHeight +
			", top=" +
			top +
			", left=" +
			left
	);
};

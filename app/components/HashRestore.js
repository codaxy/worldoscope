import { VDOM } from "cx/ui";

export class HashRestore extends VDOM.Component {
	render() {
		return null;
	}

	componentDidMount() {
		let hash = window.location.hash;
		if (hash) {
			setTimeout(() => {
				location.replace("#");
				location.replace(hash);
			}, 300);
		}
	}
}

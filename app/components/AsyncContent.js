import { Widget, PureContainer } from "cx/ui";

export class AsyncContent extends PureContainer {
	initInstance(context, instance) {
		super.initInstance(context, instance);
		if (!this.loaded && this.onLoadContent) {
			this.onLoadContent().then(content => {
				this.loaded = true;
				this.items = [Widget.create(content)];
				instance.setState({
					loaded: true
				});
			});
		}
	}
}

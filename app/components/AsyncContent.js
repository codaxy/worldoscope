import {Widget, PureContainer} from 'cx/ui';

export class AsyncContent extends PureContainer {
    initInstance(context, instance) {
        super.initInstance(context, instance);
        if (this.onLoadContent) {
            this.onLoadContent()
                .then(content => {
                    this.items = [Widget.create(content)];
                    instance.store.notify();
                })
        }
    }
}

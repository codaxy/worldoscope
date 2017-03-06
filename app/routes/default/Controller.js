import { Controller } from 'cx/ui';

import { getMyStars } from 'api';

export default class extends Controller {
    onInit() {
        getMyStars()
            .then(stars => {
                console.log(stars);
                this.store.set('$page.stars', stars);
            })
            .catch(e => {
                console.log(e);
            })
    }
}
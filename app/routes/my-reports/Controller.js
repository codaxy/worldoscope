import { Controller } from 'cx/ui';

import { getMyReports } from 'api';

export default class extends Controller {
    onInit() {
        this.store.set('status', 'loading')
        getMyReports()
            .then(reports => {
                this.store.set('reports', reports);
                this.store.set('status', 'ok')
            })
            .catch(e => {
                this.store.set('status', 'error');
                console.log(e);
            })
    }
}
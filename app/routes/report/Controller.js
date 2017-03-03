import { Controller } from 'cx/ui';

import { loadReport } from 'api';

export default class extends Controller {
    onInit() {
        this.loadReport();
    }

    loadReport() {
        let id = this.store.get('$route.id');
        if (id != 'new') {
            loadReport(id)
                .then(def => {
                    this.store.set('$page.report', def);
                })
        }
        else {
            this.store.set('$page.report', {
                title: 'New Report'
            });
        }
    }
}
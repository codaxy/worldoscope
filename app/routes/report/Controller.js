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
            this.store.init('$page.report', {
                title: 'New Report',
                sections: []
            });
        }
    }

    addMap(e) {
        e.preventDefault();
        document.activeElement.blur();

        this.store.update('$page.report.sections', sections => [...sections, {
            form: {
                title: 'New Section'
            }
        }])
    }
}
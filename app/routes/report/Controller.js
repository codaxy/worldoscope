import { Controller, History } from 'cx/ui';

import { loadReport, addReport, saveReport, auth, addStar, removeStar, isStarred } from 'api';

export default class extends Controller {
    onInit() {
        this.loadReport();
    }

    loadReport() {
        let id = this.store.get('$route.id');
        if (id != 'new') {
            this.store.set('$page.status', 'loading');
            loadReport(id)
                .then(def => {
                    this.store.set('$page.report', def);
                    this.store.delete('$page.status');
                });

            if (auth.currentUser) {
                isStarred(id)
                    .then(value => this.store.set('$page.starred', value));
            }
        }
        else {
            this.store.init('$page.report', {
                title: 'New Report',
                sections: [],
                public: true, //for now
                userId: auth.currentUser ? auth.currentUser.uid : null
            });
        }
    }

    saveReport() {
        let report = this.store.get('$page.report');
        let id = this.store.get('$route.id');

        if (id == 'new') {
            addReport(report)
                .then(rep => {
                    History.replaceState({}, null, `~/${rep.id}`);
                });
        }
        else {
            saveReport(id, report);
        }
    }

    starReport() {
        let id = this.store.get('$route.id');
        addStar(id)
            .then(() => {
                this.store.set('$page.starred', true);
            })
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
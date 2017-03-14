import { Controller, History } from 'cx/ui';
import { updateArray } from 'cx/data';

import { loadReport, addReport, saveReport, currentUserId, addStar, removeStar, isStarred } from 'api';

import uid from 'uid';

export default class extends Controller {
    onInit() {
        this.loadReport();
    }

    loadReport() {
        let id = this.store.get('$route.id');
        if (id != 'new') {
            if (!this.store.get('$page.report'))
                this.store.set('$page.status', 'loading');

            loadReport(id)
                .then(def => {
                    this.store.set('$page.report', def);
                    this.store.delete('$page.status');
                    this.setupAutoSave();
                });

            if (currentUserId()) {
                isStarred(id)
                    .then(value => this.store.set('$page.starred', value));
            }
        }
        else {
            this.store.init('$page.report', {
                title: 'New Report',
                sections: [],
                public: true, //for now
                autoSave: true,
                userId: currentUserId()
            });

            this.editHeader();
        }

        this.addTrigger('trackPins', ['$page.report'], report => {
            let defaults = report.defaults || {};
            if (report.sections)
                this.store.update('$page.report.sections', updateArray, section => {
                    let pins = {
                        ...section.pins
                    };
                    pins.fromYear = pins.toYear = pins.period;
                    ['topic', 'countries', 'fromYear', 'toYear'].forEach(field => {
                        if (pins[field] && section[field] != defaults[field])
                            section = {
                                ...section,
                                [field]: defaults[field] || null //firebase rejects undefined values
                            }
                    });
                    return section;
                });
        })
    }

    editHeader() {
        let {title, description, defaults} = this.store.get('$page.report');
        this.store.set('$page.header', {
            title, description, edit: true
        });
        this.store.set('$page.defaults', defaults);
    }

    setupAutoSave() {
        this.addTrigger('autoSave', ['$page.report'], report => {
            if (report.autoSave) {
                this.saveReport();
            }
        });
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

    unstarReport() {
        let id = this.store.get('$route.id');
        removeStar(id)
            .then(() => {
                this.store.set('$page.starred', false);
            })
    }

    addMap(e) {
        let defaults = this.store.get('$page.report.defaults') || {};

        this.addSection(e, {
            type: 'map',
            topic: defaults.topic,
            year: defaults.toYear,
            region: defaults.region
        });
    }

    addLegend(e) {
        let defaults = this.store.get('$page.report.defaults') || {};

        this.addSection(e, {
            type: 'legend',
            region: defaults.region,
            countries: defaults.countries
        });
    }

    addLineGraph(e) {
        let defaults = this.store.get('$page.report.defaults') || {};

        this.addSection(e, {
            type: 'line-chart',
            topic: defaults.topic,
            indicator: defaults.indicator,
            fromYear: defaults.fromYear,
            toYear: defaults.toYear,
            region: defaults.region,
            countries: defaults.countries
        });
    }

    addColumnGraph(e) {
        let defaults = this.store.get('$page.report.defaults') || {};

        this.addSection(e, {
            type: 'column-chart',
            topic: defaults.topic,
            year: defaults.toYear,
            region: defaults.region,
            countries: defaults.countries
        });
    }

    addBarGraph(e) {
        let defaults = this.store.get('$page.report.defaults') || {};

        this.addSection(e, {
            type: 'bar-chart',
            topic: defaults.topic,
            region: defaults.region,
            indicator: defaults.indicator,
        });
    }

    addTableTrend(e) {
        let defaults = this.store.get('$page.report.defaults') || {};

        this.addSection(e, {
            type: 'table-trend',
            region: defaults.region,
            indicator: defaults.indicator,
            fromYear: defaults.fromYear,
            toYear: defaults.toYear,
        });
    }

    addTableIndicators(e) {
        let defaults = this.store.get('$page.report.defaults') || {};

        this.addSection(e, {
            type: 'table-indicators',
            region: defaults.region,
            year: defaults.toYear,
        });
    }

    addSection(e, section) {
        e.preventDefault();
        document.activeElement.blur();

        let data = {
            title: 'New Section',
            id: uid()
        };

        for (var key in section)
            if (typeof section[key] != 'undefined')
                data[key] = section[key];

        this.store.update('$page.report.sections', sections => [...(sections || []), data]);

        //open in edit mode
        this.store.update('$page.sections', sections => ({
            ...sections,
            [data.id]: {form: data}
        }));
    }
}
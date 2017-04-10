import {Controller} from 'cx/ui';

import {getMyStars, getPublicReports, getMyReports} from 'api';

export default class extends Controller {
  onInit() {
    this.addTrigger('start', ['user'], ::this.loadStars, true);
    this.store.init('$page.tab', 'popular');

    this.addTrigger(
      'load',
      ['$page.tab'],
      tab => {
        switch (tab) {
          case 'popular':
            this.loadSamples();
            break;

          case 'starred':
            this.loadStars();
            break;

          case 'saved':
            this.loadMyReports();
            break;
        }
      },
      true,
    );
  }

  loadStars() {
    this.store.set('$page.stars.status', 'loading');
    getMyStars()
      .then(stars => {
        this.store.set('$page.stars.data', stars);
        this.store.set('$page.stars.status', 'ok');
      })
      .catch(e => {
        this.store.set('$page.stars.status', 'error');
        console.log(e);
      });
  }

  loadMyReports() {
    this.store.set('$page.myReports.status', 'loading');
    getMyReports()
      .then(reps => {
        this.store.set('$page.myReports.data', reps);
        this.store.set('$page.myReports.status', 'ok');
      })
      .catch(e => {
        this.store.set('$page.myReports.status', 'error');
        console.log(e);
      });
  }

  loadSamples() {
    this.store.set('$page.samples.status', 'loading');
    getPublicReports()
      .then(reports => {
        this.store.set('$page.samples.data', reports);
        this.store.set('$page.samples.status', 'ok');
      })
      .catch(e => {
        this.store.set('$page.samples.status', 'error');
        console.log(e);
      });
  }
}

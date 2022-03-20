import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  page = 'tabs';

  /**
   * I'd mostly though of Ionic lifecycle events as something used
   * with just pages, but not every Angular component. I'm looking
   * at events for tabs (which is a container for other pages) and
   * for the about-popover.
   * 
   * When refreshing on schedule, the 2 enter events for tabs fire
   * after those for schedule:
   *    ngOnInit tabs
   *    ngOnInit schedule
   *    ionViewWillEnter schedule
   *    ionViewDidEnter schedule
   *    ionViewWillEnter tabs <<<
   *    ionViewDidEnter tabs <<<
   * 
   * But when coming from tutorial, they are intermixed (I don't
   * think this is a big deal, just a curiosity):
   *    ngOnInit tabs
   *    ngOnInit schedule
   *    ionViewWillLeave tutorial
   *    ionViewWillEnter tabs <<<
   *    ionViewWillEnter schedule
   *    ionViewDidEnter schedule
   *    ionViewDidEnter tabs <<<
   *    ionViewDidLeave tutorial
   */

  ngOnInit() {
    console.log(`ngOnInit ${this.page}`);
  }

  ionViewWillEnter() {
    console.log(`ionViewWillEnter ${this.page}`);
  }

  ionViewDidEnter() {
    console.log(`ionViewDidEnter ${this.page}`);
  }

  ionViewWillLeave() {
    console.log(`ionViewWillLeave ${this.page}`);
  }

  ionViewDidLeave() {
    console.log(`ionViewDidLeave ${this.page}`);
  }
}

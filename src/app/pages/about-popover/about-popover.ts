import { Component } from '@angular/core';

import { PopoverController } from '@ionic/angular';

@Component({
  template: `
    <ion-list>
      <ion-item button (click)="close('https://ionicframework.com/getting-started')">
        <ion-label>Learn Ionic</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://ionicframework.com/docs/')">
        <ion-label>Documentation</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://showcase.ionicframework.com')">
        <ion-label>Showcase</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://github.com/ionic-team/ionic')">
        <ion-label>GitHub Repo</ion-label>
      </ion-item>
      <ion-item button (click)="support()">
        <ion-label>Support</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class PopoverPage {
  page = 'about popover (not really a page)';

  constructor(public popoverCtrl: PopoverController) {}

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

  support() {
    // this.app.getRootNavs()[0].push('/support');
    this.popoverCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.popoverCtrl.dismiss();
  }
}

import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, NavController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import Swiper from 'swiper';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
export class TutorialPage {
  page = 'tutorial';
  showSkip = true;
  private slides: Swiper;

  constructor(
    public router: Router,
    private navController: NavController,
    public menu: MenuController,
    public storage: Storage,
    private cd: ChangeDetectorRef
  ) {}

  startApp() {

    /**
     * These ones weren't broken like the others. I guess `replaceUrl` is
     * pretty similar to using Ionic's navigateRoot.
     */
    // this.router
    //   .navigateByUrl('/app/tabs/schedule', { replaceUrl: true })
    //   .then(() => this.storage.set('ion_did_tutorial', true));

    this.navController
      .navigateRoot('/app/tabs/schedule')
      .then(() => this.storage.set('ion_did_tutorial', true));

  }

  setSwiperInstance(swiper: Swiper) {
    this.slides = swiper;
  }

  onSlideChangeStart() {
    this.showSkip = !this.slides.isEnd;
    this.cd.detectChanges();
  }

  ngOnInit() {
    console.log(`ngOnInit ${this.page}`);
  }

  ionViewWillEnter() {
    console.log(`ionViewWillEnter ${this.page}`);

    this.storage.get('ion_did_tutorial').then(res => {
      if (res === true) {
        // this.router.navigateByUrl('/app/tabs/schedule', { replaceUrl: true });
        this.navController.navigateRoot('/app/tabs/schedule');
      }
    });

    this.menu.enable(false);
  }

  ionViewDidEnter() {
    console.log(`ionViewDidEnter ${this.page}`);

  }

  ionViewWillLeave() {
    console.log(`ionViewWillLeave ${this.page}`);

  }

  ionViewDidLeave() {
    console.log(`ionViewDidLeave ${this.page}`);

    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}

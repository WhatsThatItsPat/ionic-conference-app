import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import {
  MenuController,
  Platform,
  ToastController,
  NavController
} from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'Schedule',
      url: '/tabs/schedule',
      icon: 'calendar'
    },
    {
      title: 'Speakers',
      url: '/tabs/speakers',
      icon: 'people'
    },
    {
      title: 'Map',
      url: '/tabs/map',
      icon: 'map'
    },
    {
      title: 'About',
      url: '/tabs/about',
      icon: 'information-circle'
    }
  ];
  loggedIn = false;
  dark = false;

  constructor(
    private menu: MenuController,
    private platform: Platform,

    private router: Router,
    private navController: NavController,

    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
  ) {
    this.initializeApp();
  }

  /**
   * Interesting...using async here. Any reason, and is it possible to
   * do the same for Ioinic lifecycle events?
   */
  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userData.logout().then(() => {
      // Did I miss one? Should this be navigateRoot?
      // return this.router.navigateByUrl('/tabs/schedule');
      return this.navController.navigateRoot('/tabs/schedule');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);

    /**
     * The ones in the templage do the root thing.
     * 
     * This leaves the tabs component in the DOM. The ng-component that holds
     * the tabs gets a class `ion-page-hidden`. The page-tutorial component
     * ends up as its sibling and gets the class `can-go-back`. They both have
     * the `ion-page` class.
     */
    // this.router.navigateByUrl('/tutorial');
    // I don't see a difference between navigate and *ByUrl
    // this.router.navigate(['tutorial']);

    /**
     * The items in the sidemenu template use routerDirection="root",
     * and I think we need to do the same in code for this one. When using
     * `navigateRoot`, the ng-component that holds the tabs is cleared like
     * with the delarative ones in the template. There's only one `ion-page`
     * at the root level and those `ion-page-hidden` and `can-go-back`
     * classes aren't used.
     */
    this.navController.navigateRoot('/tutorial');
  }
}

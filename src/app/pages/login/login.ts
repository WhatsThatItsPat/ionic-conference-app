import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  page = 'login';
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    private navController: NavController,
  ) { }

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

  ngOnDestroy() {
    console.log(`ngOnDestroy ${this.page}`);
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      /**
       * Same issue with not properly navigating to root so
       * we can clear pages in the DOM.
       */
      // this.router.navigateByUrl('/app/tabs/schedule');
      this.navController.navigateRoot('/app/tabs/schedule');
    }
  }

  onSignup() {
    /**
     * The sidemenu has /login and /signup items. They both use
     * routerDirection="root" so when you click back and forth the
     * previous page is removed from the DOM.
     * 
     * This login page has a signup button and when clicking that,
     * login is NOT removed from the DOM and ngOnDestroy isn't called.
     * 
     * The same thing happens after you signup, so both login and signup
     * are in the DOM when you get into tabs/schedule.
     * 
     * See: src/assets/notes/login>signup>tabs:schedule.jpg
     * And I also recorded a video looking at this stuff.
     */
    // this.router.navigateByUrl('/signup');

    this.navController.navigateRoot('/signup');

  }
}

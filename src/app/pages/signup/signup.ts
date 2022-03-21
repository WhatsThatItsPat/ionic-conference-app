import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  page = 'signup';
  signup: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
    private navController: NavController,
    public userData: UserData
  ) {}

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

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.signup.username);
      /**
       * Same issue with not properly navigating to root so
       * we can clear pages in the DOM.
       */
      // this.router.navigateByUrl('/app/tabs/schedule');
      this.navController.navigateRoot('/app/tabs/schedule');
    }
  }
}

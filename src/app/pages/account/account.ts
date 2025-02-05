import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, NavController } from '@ionic/angular';

import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements AfterViewInit {
  page = 'account';
  username: string;

  constructor(
    public router: Router,
    private navController: NavController,
    public alertCtrl: AlertController,
    public userData: UserData
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

  ngAfterViewInit() {
    console.log(`ngAfterViewInit ${this.page}`);
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Change Username',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.userData.setUsername(data.username);
            this.getUsername();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.username,
          placeholder: 'username'
        }
      ]
    });
    await alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    /**
     * Same issue with not properly navigating to root so
     * we can clear pages in the DOM.
     */
    // this.router.navigateByUrl('/login');
    this.navController.navigateRoot('/login');
  }

  support() {
    /**
     * Same issue with not properly navigating to root so
     * we can clear pages in the DOM.
     */
    // this.router.navigateByUrl('/support');
    this.navController.navigateRoot('/support');
  }
}

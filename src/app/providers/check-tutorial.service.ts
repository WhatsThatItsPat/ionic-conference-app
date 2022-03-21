import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class CheckTutorial implements CanLoad {
  constructor(
    private storage: Storage,
    private router: Router,
    private navController: NavController,
  ) {}

  canLoad() {
    return this.storage.get('ion_did_tutorial').then(res => {
      if (res) {
        // Here's another.
        // this.router.navigate(['/app', 'tabs', 'schedule']);
        this.navController.navigateRoot('/app/tabs/schedule');
        return false;
      } else {
        return true;
      }
    });
  }
}

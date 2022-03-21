import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  page = 'test (not page)'

  constructor() { }

  ngOnInit() {
    console.log(`ngOnInit ${this.page}`);
  }

  /**
   * None of the Ionic lifecycles will fire because it's a normal component.
   */
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

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AboutPage } from '../../pages/about/about';
import { SelImagePage } from '../../pages/selimage/selimage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  aboutPage = AboutPage;
  selImagePage = SelImagePage;
  constructor(public navCtrl: NavController) {

  }
}

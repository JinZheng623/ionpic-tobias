import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HomePage} from '../../pages/home/home';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  homePage = HomePage;
  constructor(public navCtrl: NavController) {

  }

}

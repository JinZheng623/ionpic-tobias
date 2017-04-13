import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HomePage} from '../../pages/home/home';
@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class HelpPage {
  homePage = HomePage;
  constructor(public navCtrl: NavController) {

  }

}

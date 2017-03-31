import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AboutPage} from '../../pages/about/about';
import { SelImagePage} from '../../pages/selimage/selimage';
import { HomePage } from '../../pages/home/home';
@Component({
  selector: 'page-sendsuccess',
  templateUrl: 'sendsuccess.html'
})
export class SendSuccessPage {
  aboutPage = AboutPage;
  selImagePage = SelImagePage;
  homePage = HomePage;
  constructor(public navCtrl: NavController) {

  }
}

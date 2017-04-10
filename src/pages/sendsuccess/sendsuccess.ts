import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HelpPage} from '../../pages/help/help';
import { SelImagePage} from '../selimage/selimage';
import { HomePage } from '../../pages/home/home';
@Component({
  selector: 'page-sendsuccess',
  templateUrl: 'sendsuccess.html'
})
export class SendSuccessPage {
  helpPage = HelpPage;
  selImagePage = SelImagePage;
  homePage = HomePage;
  constructor(public navCtrl: NavController) {

  }
}

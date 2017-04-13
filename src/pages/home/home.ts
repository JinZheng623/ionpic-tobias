import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HelpPage } from '../../pages/help/help';
import { SelImagePage } from '../selimage/selimage';

import * as Fingerprintjs2 from 'fingerprintjs2'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  helpPage = HelpPage;
  selImagePage = SelImagePage;
  constructor(public navCtrl: NavController) {
    Fingerprintjs2().get (function(result, components){
      console.log(result);
    });
  }

  // goSelImagePage(){
  //   this.http.get('/config.json').map(res => res.json()).subscribe(data => {
  //     this.navCtrl.push(SelImagePage, { config: data });
  //   });
  // }
}

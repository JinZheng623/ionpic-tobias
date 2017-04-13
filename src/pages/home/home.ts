import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HelpPage } from '../../pages/help/help';
import { SelImagePage } from '../selimage/selimage';
import { ReprintPage } from '../reprint/reprint';
import { GlobalVars } from '../../app/globalVars';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  helpPage = HelpPage;
  selImagePage = SelImagePage;
  reprintPage = ReprintPage;
  btnReprintFlag: boolean;
  constructor(public navCtrl: NavController, public globalVars: GlobalVars, http: Http) {

    http.get('config.json').map(res => res.json()).subscribe(data => {
      globalVars.setMyGlobalVar(data);
      this.btnReprintFlag = data.ReprintEnable;
    });

  }

  // goSelImagePage(){
  //   this.http.get('/config.json').map(res => res.json()).subscribe(data => {
  //     this.navCtrl.push(SelImagePage, { config: data });
  //   });
  // }
}

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalVars} from './globalVars';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private http: Http, globalVars: GlobalVars) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.http.get('/config.json').map(res => res.json()).subscribe(data => {
        globalVars.setMyGlobalVar(data);
      });
    });
  }
}

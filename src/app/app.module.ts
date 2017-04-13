import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelpPage } from '../pages/help/help';
import { HomePage } from '../pages/home/home';
import { SelImagePage } from '../pages/selimage/selimage';
import { SendSuccessPage } from '../pages/sendsuccess/sendsuccess';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {GlobalVars} from './globalVars';
import {ReprintPage} from "../pages/reprint/reprint";

@NgModule({
  declarations: [
    MyApp,
    HelpPage,
    HomePage,
    SelImagePage,
    ReprintPage,
    SendSuccessPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelpPage,
    HomePage,
    SelImagePage,
    ReprintPage,
    SendSuccessPage,
  ],
  providers: [
    GlobalVars,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

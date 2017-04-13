"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var home_1 = require('../../pages/home/home');
var HelpPage = (function () {
    function HelpPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.homePage = home_1.HomePage;
    }
    HelpPage = __decorate([
        core_1.Component({
            selector: 'page-help',
            templateUrl: 'help.html'
        })
    ], HelpPage);
    return HelpPage;
}());
exports.HelpPage = HelpPage;

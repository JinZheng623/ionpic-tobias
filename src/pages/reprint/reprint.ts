import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HomePage} from '../../pages/home/home';
import { SendSuccessPage } from '../../pages/sendsuccess/sendsuccess';


import { Platform } from 'ionic-angular';

import { DomSanitizer } from '@angular/platform-browser';

import $ from "jquery";

import { GlobalVars } from '../../app/globalVars';
import {NgModel} from "@angular/forms";


@Component({
  selector: 'page-reprint',
  templateUrl: 'reprint.html'
})

export class ReprintPage {
  imgArrays : Array<any>; // All Images are in Array
  imgMaxNum = 0; // the Max Number of Images
  imgAgeHours = 0; // the Max age hours
  imgAgeMax = 0; // the Max age
  btnSelFlag = false; // Show two or one button in html
  homePage = HomePage;
  is_safari = false;

  //progress variables
  max = 0;
  proValue = 0;

  config: any;
  fingerprint: any;
  reprintUrl: any;

  clickIndex = 0;
  files = [];

  ionViewDidLoad() {

    var self = this;

    this.reprintUrl = this.config.ServerUrl + "/reprint.php";
    $.post(this.reprintUrl,
      {
        fingerprint: this.fingerprint,
        get_image: true
      },
      function (result) {
        self.initializeImage(result);
        self.btnSel();
        $(".fadeMe").hide();
      },
      "json"
    );
  }


  //initialize all kind of variables
  constructor(public navCtrl: NavController,
              public platform : Platform,
              public globalVars: GlobalVars,
              public sanitizer: DomSanitizer
  )
  {
    this.fingerprint = globalVars.getFingerprint();
    this.config = globalVars.getMyGlobalVar();
    // this.is_safari = navigator.userAgent.toLowerCase().indexOf('iphone') > -1 || navigator.userAgent.toLowerCase().indexOf('mac') > -1;

    this.InitialData();
  }

  initializeImage(imageUrls){
    for(let _i = 0; _i < imageUrls.length; _i++){
      let item ={
        id: _i,
        img: imageUrls[_i],
        bFlag : true,
        file : null,
        checked: true
      };
      this.imgArrays.push(item);
      this.imgMaxNum = imageUrls.length;
    }
  }


  //In selimage.html you can change back button into two button back and print.
  //Needs to show, Set Flag
  private btnSel(){
    for(let _i=0; _i<this.imgMaxNum;_i++){
      if (this.imgArrays[_i].bFlag)
      {
        this.btnSelFlag = true;// btnSelflag is true then show two buttons
        break;
      }else if(_i == this.imgMaxNum-1)
      {
        this.btnSelFlag = false; // Only one button
      }
    }
  }

  InitialData(){
      this.imgArrays= [];
      // this.initializeImage();
      this.max = 0;
      this.proValue = 0;
      this.files = [];
      this.clickIndex = 0;
  }

  toggleItem(item){
    this.imgArrays[item.id].checked = !this.imgArrays[item.id].checked;
  }

  fileSend(){
    $(".fadeMe").show();

    var self = this;
    var reprintImgs = Array();
    for(let imageSub of this.imgArrays){
      if (imageSub.checked == true && imageSub.img != null){
        reprintImgs.push(imageSub.img);
      }
    }

    $.post(this.reprintUrl, {
      fingerprint: this.fingerprint,
      reprint_image: reprintImgs
    },
    function (result) {
      self.InitialData();
      self.navCtrl.push(SendSuccessPage);
    });
  }
}

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HomePage} from '../../pages/home/home';
import { SendSuccessPage } from '../../pages/sendsuccess/sendsuccess';


import { Platform } from 'ionic-angular';

import { DomSanitizer } from '@angular/platform-browser';

import $ from "jquery";

import { GlobalVars } from '../../app/globalVars';


@Component({
  selector: 'page-selimage',
  templateUrl: 'selimage.html'
})

export class SelImagePage {
  imgArrays =[]; // All Images are in Array
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
  pageContent: any;

  clickIndex = 0;
  files = [];

  ionViewDidLoad() {

    // alert(is_safari);

    var camera = document.getElementById('camera');
    var self = this;

    camera.addEventListener('change', function(e: any) {
        var file = e.target.files[0];
      if (file != undefined) {
        if (file != null) {

          var file = this.files[0];
          //if (typeof this.files[0].lastModified === 'undefined') {
          var lastModified = file.lastModified;
          //}else{
          //  var lastModified = this.files[0].lastModified;
          //}
          // if (d.toLocaleDateString) {
          //   lastModified = d.toLocaleDateString(file.lastModified);
          // }
          // else {
          //   lastModified = file.lastModified;
          // }

          // alert(e.target.value);
          // file = Server.MapPath(file);
          // var fso = new ActiveXObject("Scripting.FileSystemObject");
          // var fs = fso.GetFile(thisfile);
          // var dlm = fs.DateLastModified;
          // Response.Write("Last modified: " + dlm);

          var ageLimit = new Date(self.config.ImgAgeDate);
          var ageLimitMs = ageLimit.getTime();
          //alert("limit: "+new Date(ageLimitMs)+"<br>img: "+new Date(lastModified));
          //alert(file.lastModifiedDate);
          if (lastModified < ageLimitMs) {
            alert("Sorry das Bild ist schon zu alt.");
          }
          else if (self.imgMaxNum == 1) {
            self.imgArrays[0].img = self.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
            self.imgArrays[0].bFlag = true;
            self.imgArrays[0].file = file;
            self.btnSel();
          }
          else {
            self.imgArrays[self.clickIndex].img = self.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
            self.imgArrays[self.clickIndex].bFlag = true;
            self.imgArrays[self.clickIndex].file = file;
            self.btnSel();
          }


        }
      }
    });
    $(".fadeMe").hide();

    if(this.imgMaxNum == 1){
      $("ion-thumbnail").addClass("one-image")
    }
    if((this.is_safari && this.config.CamOnly == 1) || this.config.CamOnly == 2){
      this.camOnlyAction();
    }
  }


  //initialize all kind of variables
  constructor(public navCtrl: NavController,
              public platform : Platform,
              public globalVars: GlobalVars,
              public sanitizer: DomSanitizer
  )
  {
    this.config = globalVars.getMyGlobalVar();
    console.log(this.config);
    this.is_safari = navigator.userAgent.toLowerCase().indexOf('iphone') > -1 || navigator.userAgent.toLowerCase().indexOf('mac') > -1;
      if (this.config.ImgAgeFlag==true) // Selectable MaxNum
      {
        if(this.is_safari){
          if(this.config.SafariLimit == 0){
            this.imgMaxNum = 0;
          }
          else if(this.config.SafariLimit == 9999){
            this.imgMaxNum = this.config.ImgMaxNum;
          }
          else{
            this.imgMaxNum = this.config.SafariLimit;
          }
        }
        else{
          this.imgMaxNum = this.config.ImgMaxNum;
        }

        var dateNow = new Date();
        var dateNowMs = dateNow.getTime();
        var ageLimit = new Date(this.config.ImgAgeDate);
        var ageLimitMs = ageLimit.getTime();
        this.imgAgeHours = Math.round((dateNowMs-ageLimitMs)/3600000);
      } else {
        this.imgMaxNum = 6;
      }


      if(this.config.CamOnly == 2 || (this.config.CamOnly == 1 && this.is_safari == true)) {
        this.imgMaxNum = 1
      }
      //initialize the Imagearray,Using this, duplicate the thumbnail
    this.InitialData();
    this.btnSel(); // Call function to show Print and back Button

  }

  private camOnlyAction(){
    $('#camera').prop('capture', true);
    $('#camera').click();
  }

  initializeImage(){
    for(let _i=0; _i<this.imgMaxNum;_i++){
      let item ={
        id: _i,
        img: "",
        bFlag : false,
        file : null
      };
      this.imgArrays.push(item);
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

  //remove Images seleted
  removeImage(imgId){
    this.imgArrays[imgId].img = "";
    this.imgArrays[imgId].bFlag =false;
    this.imgArrays[imgId].file = null;
    this.btnSel();
  }

  //actionsheet camera button and search file
  presentActionSheet(imgId){
    this.clickIndex = imgId;
    if(this.imgMaxNum == 1){
      this.camOnlyAction();
    }
    else{
      $('#camera').click();
    }
  }


  private createFileName() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + '-' + s4() + '-' + s4()+'.jpg';
  }

  InitialData(){
      this.imgArrays=[];
      this.initializeImage();
      this.max = 0;
      this.proValue = 0;
      this.files = [];
      this.clickIndex = 0;
  }

  fileSend(){
    $(".fadeMe").show();
    var formData = new FormData();
    for(let imageSub of this.imgArrays){
      if (imageSub.bFlag == true && imageSub.file != null){
        formData.append("fileName[]", imageSub.file,this.createFileName() );
      }
    }

    var self = this
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("load", transferComplete);
    xhr.upload.addEventListener("error", transferFailed);
    xhr.upload.addEventListener("progress", updateProgress);
    xhr.open("POST", this.config.ServerUrl);

    xhr.send(formData);

    function updateProgress(evt) {
        self.max = evt.total;
        self.proValue = evt.loaded;
    }

    function transferComplete(evt) {
      self.InitialData();
      self.navCtrl.push(SendSuccessPage);
    }

    function transferFailed(evt) {
      alert("An error occurred while transferring the file.");
    }
  }


}

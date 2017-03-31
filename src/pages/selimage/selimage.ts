import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HomePage} from '../../pages/home/home';
import { SendSuccessPage } from '../../pages/sendsuccess/sendsuccess';

import { ActionSheetController } from 'ionic-angular';
import { Platform, LoadingController, Loading } from 'ionic-angular';

import { ImagePicker } from 'ionic-native';
import { ConfigData } from './config';

import { Camera } from 'ionic-native';

import { File, Transfer, FilePath} from 'ionic-native';

declare let cordova : any;

@Component({
  selector: 'page-selimage',
  templateUrl: 'selimage.html'
})
export class SelImagePage {
  imgArrays =[]; // All Images are in Array
  imgMaxNum = 0; // the Max Number of Images
  btnSelFlag = false; // Show two or one button in html
  homePage = HomePage;
  sendArrays = [] ;
  
  //initialize all kind of variables
  constructor(public navCtrl: NavController, 
              public actionSheetCtrl:ActionSheetController,
              public platform : Platform,
              public loadingCtrl : LoadingController
  )
  {
    if (ConfigData.ImgAgeFlag==true) // Selectable MaxNum
    {
      this.imgMaxNum = ConfigData.ImgMaxNum;
    } else {
      this.imgMaxNum = 6;
    }
    //initialize the Imagearray,Using this, duplicate the thumbnail
    for(let _i=0; _i<this.imgMaxNum;_i++){
      let item ={
        id: _i,
        img: "",
        bFlag : false
      };
      this.imgArrays.push(item);
    }
    this.btnSel(); // Call function to show Print and back Button
  }




  // base64 to image
  b64toBlob(b64Data) {
        var contentType = 'jpg';
        var sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
  }

  //Using Camera take a photo
  private takePicture(imgId){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum:false,
        correctOrientation:true,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        var DataBlob = this.b64toBlob(imageData);
        var newFileName = this.createFileName();
        File.writeFile(cordova.file.dataDirectory,newFileName,DataBlob,{replace:true})
          .then(_=>
          {
            this.imgArrays[imgId].img = cordova.file.dataDirectory + newFileName;
            this.imgArrays[imgId].bFlag = true;
            this.btnSel();
          }
        );
        
    }, (err) => {
        console.log(err);
    });
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

  // ... can access Gallery and get Images selected 
  private openGallery (imgId): void {
    let options = {
      maximumImagesCount: this.imgMaxNum,
      width: 500,
      height: 500,
      quality: 75
    }
    //get Images
    ImagePicker.getPictures(options).then(
      (results) => {
          let index = 0;
          let j = imgId;
          
          for(let i=0;i<this.imgMaxNum;i++){
              if(!this.imgArrays[j].bFlag){ 
                this.imgArrays[j].img = results[index];
                this.imgArrays[j].bFlag = true;
                index++;
              }
              j++;
              if (index ==results.length){
                break;
              }
              if(j == this.imgMaxNum){
                j=j-this.imgMaxNum;
              }
          }
          this.btnSel();
      }, (error) => {
          alert("ERROR -> " + JSON.stringify(error));
      }
    );

  }

  //remove Images seleted
  removeImage(imgId){
    this.imgArrays[imgId].img = "";
    this.imgArrays[imgId].bFlag =false;
    this.btnSel();
  }

  //actionsheet camera button and search file
  presentActionSheet(imgId){
    let actionSheet = this.actionSheetCtrl.create({
      cssClass:'action-group',
      buttons:[
      {
        cssClass:'action-camera',
        icon: 'camera',
        text:'Camera',
        handler:()=>{
          this.takePicture(imgId);
        }
      },
      {
        cssClass:'action-files',
        icon: 'image',
        text:'Files',
        handler:()=>{
          this.openGallery(imgId);
        }
      }
      ]
    });
    actionSheet.present();
  }


  
  lastImage: string =null; // selected image
  loading:Loading; // loading process;
  count = 0;


  uploadImage() {
    // Destination URL
    var url = ConfigData.ServerUrl;
  
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
    // File name only
    var filename = this.lastImage;
 //   alert('targetpath:     '+targetPath+ '   filename:'+filename);
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename}
    };
  
    const fileTransfer = new Transfer();
  
    // this.loading = this.loadingCtrl.create({
    //   content: 'Uploading...',
    //   duration: 500
    // });
    // this.loading.present();
  
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      // this.loading.dismissAll()
      this.count++;
      if(this.count==this.sendArrays.length){
        alert('Image succesful uploaded.');
        this.count = 0;
        this.sendArrays = [];
        this.imgArrays = []; 
        this.navCtrl.push(SendSuccessPage);
      }
    }, err => {
      // this.loading.dismissAll()
      alert('Error while uploading file.');
    });
  }
  //filetransfer
  
  fileSend(){
    this.sendArrays = [];
    for(let imageSub of this.imgArrays){
      if (imageSub.bFlag == true){
        this.sendArrays.push(imageSub.img);
      }
    }
    for(let imagePath of this.sendArrays){
        if (this.platform.is('android')) {
          FilePath.resolveNativePath(imagePath)
          .then(filePath => {
           // alert(filePath);
            var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var fileName = this.createFileName();
            this.copyFileToLocalDir(correctPath, currentName, fileName);
          });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          var fileName = this.createFileName();
  //        alert('correctPath:'+correctPath+ '   currentName:'+currentName+'fileName'+fileName);
          this.copyFileToLocalDir(correctPath, currentName,fileName );
        }
    }
  }



  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
 
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    //alert('namePath:'+namePath+ '   currentName:'+currentName+'newFileName'+newFileName);
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.uploadImage();
    }, error => {
      alert('Error while storing file.');
    });
    
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }


}

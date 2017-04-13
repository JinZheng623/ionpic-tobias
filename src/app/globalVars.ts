import {Injectable} from '@angular/core';

@Injectable()
export class GlobalVars {

  myGlobalVar : any;
  fingerprint : any;

  constructor() {
  }

  setFingerprint(value){
    this.fingerprint = value;
  }

  getFingerprint(){
    return this.fingerprint;
  }

  setMyGlobalVar(value) {
    this.myGlobalVar = value;
  }

  getMyGlobalVar() {
    return this.myGlobalVar;
  }

}

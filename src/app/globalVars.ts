import {Injectable} from '@angular/core';

@Injectable()
export class GlobalVars {

  myGlobalVar : any;

  constructor() {
  }

  setMyGlobalVar(value) {
    this.myGlobalVar = value;
  }

  getMyGlobalVar() {
    return this.myGlobalVar;
  }

}

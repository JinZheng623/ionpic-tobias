
import { OpaqueToken } from "@angular/core";

// Although the ApplicationConfig interface plays no role in dependency injection,
// it supports typing of the configuration object within the class.
export interface ApplicationConfig {
  ServerUrl: string;
  ImgAgeFlag: boolean;
  ImgAgeDate: string;
  ImgMaxNum: number;
  CamOnly: number;
  SafariLimit: number;
}

// Configuration values for our app
export const MY_CONFIG: ApplicationConfig = {
  ServerUrl: "http://innofox.de/test/partyprint/server/index.php",// mamp or xxamp server

  ImgAgeFlag: true,
  ImgAgeDate:"04/01/2017 16:00:00",
  ImgMaxNum: 15,

  CamOnly: 0,
  SafariLimit: 2};

// Create a config token to avoid naming conflicts
export const MY_CONFIG_TOKEN = new OpaqueToken('config');

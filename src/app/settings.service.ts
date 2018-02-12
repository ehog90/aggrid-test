import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {ISimpleLocation} from './interfaces';

@Injectable()
export class SettingsService {
  private static LOCALSTORAGE_NS = 'settings';
  get continuousGeoLocation(): boolean {
    return this.localStorageService.getBooleanValue(SettingsService.LOCALSTORAGE_NS, 'continuousGeolocation');
  }
  set continuousGeoLocation(value: boolean) {
    this.localStorageService.setBooleanValue(SettingsService.LOCALSTORAGE_NS, 'continuousGeolocation', value);
  }
  get staticPlace(): ISimpleLocation {
    return this.localStorageService.getObjectValue<ISimpleLocation>(SettingsService.LOCALSTORAGE_NS, 'staticPlacev2');
  }
  set staticPlace(value: ISimpleLocation){
    this.localStorageService.setObjectValue(SettingsService.LOCALSTORAGE_NS, 'staticPlacev2', value);
  }
  constructor(private localStorageService: LocalStorageService) { }

}

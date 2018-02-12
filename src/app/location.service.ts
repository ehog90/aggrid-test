import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class LocationService {

  private _locationSubject = new ReplaySubject<number[]>();
  private _locationErrors = new Subject<any>();
  private watchId = 0;


  public get locationSubject() {
    return this._locationSubject;
  }

  public get locationErrors() {
    return this._locationErrors;
  }

  async currentPosition(): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          resolve([position.coords.longitude, position.coords.latitude]);
        }, error => {
          reject(error);
        }, {enableHighAccuracy: true});
      }
      else {
        reject('No geolocation available');
      }
    });
  }
  public startWatch() {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(position => {
        this._locationSubject.next([position.coords.longitude, position.coords.latitude]);
      }, error => {

      }, {enableHighAccuracy: true});
    }
  }
  public stopWatch() {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.clearWatch(this.watchId);
      }
    }
    catch (exc) {
    }
  }

  constructor() {

  }
}

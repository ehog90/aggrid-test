import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

export enum Visibility {VISIBLE, HIDDEN};

@Injectable()
export class VisibilityService {
  visibilityChanges = new Subject<Visibility>();
  constructor() {
    const serviceObj = this;
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        serviceObj.visibilityChanges.next(Visibility.HIDDEN);
      } else {
        serviceObj.visibilityChanges.next(Visibility.VISIBLE);
      }
    });
  }

}

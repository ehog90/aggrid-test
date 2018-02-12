import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {

  private static baseRestUrl = 'https://api.blitzinfo.ehog.hu/rest';
  private static baseSocketUrl = 'https://api.blitzinfo.ehog.hu';

  // private static baseRestUrl = "http://blitzinfo.ehog.hu:5000";
  // private static baseSocketUrl = "http://blitzinfo.ehog.hu:5001";

  public get stationsUrl() {
    return `${UrlService.baseRestUrl}/stations`;
  }
  public get liveDataUrl() {
    return UrlService.baseSocketUrl;
  }

  constructor() {

  }

}

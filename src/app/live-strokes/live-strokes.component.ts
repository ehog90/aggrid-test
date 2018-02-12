import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocationService} from '../location.service';
import {ConnectionEvent, SocketIoService} from '../socket-io.service';
import {Visibility, VisibilityService} from '../visibility.service';
import {Subscription} from 'rxjs/Subscription';
import {ISimpleLocation, IStroke} from '../interfaces';
import * as _ from 'lodash';
import {getDistanceAndBearing} from '../geo-utils';
import {SettingsService} from '../settings.service';
import {GeocodingService} from "../geocoding.service";
@Component({
  selector: 'app-live-strokes',
  templateUrl: './live-strokes.component.html',
  styleUrls: ['./live-strokes.component.css']
})
export class LiveStrokesComponent implements OnInit, OnDestroy {
  data: IStroke[] = [];
  location: number[] = [];
  currentLocationDetails: ISimpleLocation = null;
  private bulkSubscription: Subscription;
  private individualSubscription: Subscription;
  constructor(private locationService: LocationService,
              private socketIOService: SocketIoService,
              private visibilityService: VisibilityService,
              private geocodingService: GeocodingService,
              private settingsService: SettingsService
  ) {
    if (this.settingsService.continuousGeoLocation) {
      this.locationService.startWatch();
      this.locationService.locationSubject
        .throttleTime(10000)
        .subscribe(location => {
          this.location = location;
          this.data.forEach(x => {
            x.dd = getDistanceAndBearing(this.location, x.latLng);
            x.dist = x.dd[0];
          });
          this.data = _.orderBy(this.data, ['dist'], ['asc']);
          this.data = _.take(this.data, 1000);
          this.geocodingService.getPlacesForLocation(location).then(l => {
            this.currentLocationDetails = l;
            this.currentLocationDetails.location = location;
          });
        });
      this.visibilityService.visibilityChanges.subscribe(visibility => {
        this.ngOnDestroy();
        if (visibility === Visibility.VISIBLE) {
          this.initialize();
        }
      });
    }
    else {
      this.currentLocationDetails = this.settingsService.staticPlace;
      if (this.currentLocationDetails) {
        this.location = this.currentLocationDetails.location;
      }
      else {
        alert('Nincs beállítva helyzet!');
      }
    }

  }
  initialize() {
    this.data = [];
    this.socketIOService.liveStrokeData(ConnectionEvent.CONNECT);
    this.bulkSubscription = this.socketIOService.strokesInit.subscribe(strokesInit => {
      this.data = strokesInit;
      this.data.forEach(x => {
        x.dd = getDistanceAndBearing(this.location, x.latLng);
        x.dist = x.dd[0];
      });
      this.data = _.orderBy(this.data, ['dist'], ['asc']);
      this.data = _.take(this.data, 1000);
    });
    this.individualSubscription = this.socketIOService.strokes.subscribe(stroke => {
      const now = new Date().getTime() / 1000;
      stroke.dd = getDistanceAndBearing(this.location, stroke.latLng);
      stroke.dist = stroke.dd[0];
      this.data.push(stroke);
      this.data = this.data.filter(x => now - (x.time.getTime() / 1000) < 600);
      this.data = _.orderBy(this.data, ['dist'], ['asc']);
      this.data = _.take(this.data, 1000);
    });
  }
  ngOnInit() {
    this.initialize();
  }
  ngOnDestroy(): void {
    try {
      this.socketIOService.liveStrokeData(ConnectionEvent.DISCONNECT);
      if (this.bulkSubscription) {
        this.bulkSubscription.unsubscribe();
      }
      if (this.individualSubscription) {
        this.individualSubscription.unsubscribe();
      }
      this.locationService.stopWatch();
    }
    catch (exc) {
      console.error(exc);
    }
  }

}

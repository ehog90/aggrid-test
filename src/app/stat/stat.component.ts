import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConnectionEvent, SocketIoService} from '../socket-io.service';
import {Visibility, VisibilityService} from '../visibility.service';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/filter';
import {IStatEntry} from '../interfaces';
import {getCountryName} from '../country-resolver';
import * as _ from 'lodash';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit, OnDestroy {
  static TYPE_HOUR = 'hour';
  static TYPE_DAY = 'day';
  static TYPE_THIS_YEAR = 'thisyr';
  static TYPE_ALL = 'all';

  type = 'hour';
  data: IStatEntry[] = [];
  allCount = 0;
  private bulkSubscription: Subscription;
  private individualSubscription: Subscription;


  constructor(private activatedRoute: ActivatedRoute,
              private socketIOService: SocketIoService,
              private visibilityService: VisibilityService) {
    this.visibilityService.visibilityChanges.subscribe(visibility => {
      this.ngOnDestroy();
      if (visibility === Visibility.VISIBLE) {
        this.initialize();
      }
    });
    this.activatedRoute.params.subscribe(p => {
      this.type = p['type'];
      this.ngOnDestroy();
      this.data = [];
      this.initialize();
      this.allCount = 0;
    });
  }
  initialize() {
    this.socketIOService.liveStatData(ConnectionEvent.CONNECT);
    this.bulkSubscription = this.socketIOService.statInit
      .filter(x => x.type === this.type)
      .subscribe(data => {
        this.data = data.stats;
        this.allCount = this.data.reduce((acc, val) => acc + val.count, 0);
      });
    this.individualSubscription = this.socketIOService.stats.subscribe(data => {
      const existingCountryEntry = this.data.find(x => x.countryCode === data.countryCode);
      if (existingCountryEntry) {
        ++existingCountryEntry.count;
        existingCountryEntry.lastStroke = data.time;
      }
      else {
        this.data.push({
          countryCode: data.countryCode,
          countryName: getCountryName(data.countryCode, 'hu'),
          count: 1,
          percent: 0,
          lastStroke: data.time
        });
      }
      this.allCount = this.data.reduce((acc, val) => acc + val.count, 0);
      this.data.forEach(x => {
        x.percent = (x.count / this.allCount) * 100;
      });
      this.data = _.orderBy(this.data, ['count', 'countryName'], ['desc', 'asc']);
    });
  }
  ngOnInit() {
  }
  getDifferenceInSecs(date: Date) {
    const currentDate = new Date().getTime() / 1000;
    const subjectDate = date.getTime() / 1000;
    return currentDate - subjectDate;
  }

  ngOnDestroy(): void {
    try {
      this.socketIOService.liveStatData(ConnectionEvent.DISCONNECT);
      if (this.bulkSubscription) {
        this.bulkSubscription.unsubscribe();
      }
      if (this.individualSubscription) {
        this.individualSubscription.unsubscribe();
      }
    }
    catch (exc) {
      console.error(exc);
    }
  }


}

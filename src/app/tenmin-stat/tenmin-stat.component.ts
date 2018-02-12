import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConnectionEvent, SocketIoService} from '../socket-io.service';
import {ITenminStat} from '../interfaces';
import {Subscription} from 'rxjs/Subscription';
import {Visibility, VisibilityService} from '../visibility.service';
import {getCountryName} from '../country-resolver';
import * as _ from 'lodash';

@Component({
  selector: 'app-tenmin-stat',
  templateUrl: './tenmin-stat.component.html',
  styleUrls: ['./tenmin-stat.component.css']
})
export class TenminStatComponent implements OnInit, OnDestroy {

  data: ITenminStat[];
  private bulkSubscription: Subscription;
  private individualSubscription: Subscription;
  constructor(private socketIOService: SocketIoService, private visibilityService: VisibilityService) {
    this.visibilityService.visibilityChanges.subscribe(visibility => {
      visibility === Visibility.HIDDEN ? this.ngOnDestroy() : this.ngOnInit();
    });
  }
  ngOnInit() {
    this.socketIOService.liveStatData(ConnectionEvent.CONNECT);
    this.bulkSubscription = this.socketIOService.tenminStatInit.subscribe(data => {
      this.data = data;
    });
    this.individualSubscription = this.socketIOService.stats.subscribe(data => {
      const tenMinRoundedDate = new Date(data.time.getTime() - (data.time.getTime() % (1000 * 60 * 10)));
      const selectedArray = this.data.find(x => x.timeStart.getTime() === tenMinRoundedDate.getTime());
      if (selectedArray)
      {
        selectedArray.all += 1;
        const existingCountryEntry = selectedArray.entries.find(y => y.countryCode === data.countryCode);
        if (existingCountryEntry) {
          existingCountryEntry.count += 1;
        } else {
          selectedArray.entries.push({countryCode: data.countryCode, countryName: getCountryName(data.countryCode, 'hu'), count: 1});
        }
        selectedArray.entries = _.orderBy(selectedArray.entries, ['count', 'countryName'], ['desc', 'asc']);
      } else {
        this.data.unshift({
          timeStart: tenMinRoundedDate,
          all: 1,
          entries: [{countryCode: data.countryCode, countryName: getCountryName(data.countryCode, 'hu'), count: 1}]});
      }
    });
  }
  ngOnDestroy(): void {
    try {
      this.socketIOService.liveStatData(ConnectionEvent.DISCONNECT);
      this.bulkSubscription.unsubscribe();
      this.individualSubscription.unsubscribe();
    }
    catch (exc) {
      console.error(exc);
    }
  }
}

import {Injectable} from '@angular/core';
import {UrlService} from './url.service';
import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/throttleTime';
import {IStatInit, IStroke, ITenminStat, ITimeAndCountry} from './interfaces';
import {mapStatEntry, mapStroke, mapTenminStat, mapTimeAndCountry} from './mappers';
import {LocationService} from './location.service';
export enum ConnectionEvent {CONNECT, DISCONNECT, RECONNECT}

@Injectable()
export class SocketIoService {

  private static ROOM_STROKE_INIT = 'strokesInit';
  private static ROOM_STATS_INIT = 'statsInit';
  private static ROOM_STATS = 'stats';
  private static ROOM_LOGS = 'log';
  private static ROOM_LOGS_INIT = 'logInit';
  private static ROOM_STROKES = 'strokes';
  private static ROOM_ALERTS = 'alerts';
  private liveDataConnected = false;

  private liveInitObject = {latLon: [19, 47], lang: 'hun', dt: 'angularClient', dtr: -1, dirs: []};
  private client: Socket;
  tenminStatInit: Subject<ITenminStat[]> = new Subject<ITenminStat[]>();
  statInit: Subject<IStatInit> = new Subject<IStatInit>();
  stats: Subject<ITimeAndCountry> = new Subject<ITimeAndCountry>();
  strokesInit: Subject<IStroke[]> = new Subject<IStroke[]>();
  strokes: Subject<IStroke> = new Subject<IStroke>();
  constructor(
    private urlService: UrlService,
    private locationService: LocationService,
  ) {
    this.locationService.locationSubject
      .throttleTime(5000)
      .subscribe(location => {
        this.liveInitObject.latLon = location;
        if (this.liveDataConnected) {
          this.client.emit(SocketIoService.ROOM_STROKE_INIT, this.liveInitObject);
        }
      });
  }

  public disconnect(): void {
    try {
      this.client.disconnect();
    } catch (error) {
      console.error(error);
    }
  }
  public liveStatData(ce: ConnectionEvent) {
    try {
      if (this.client) {
        this.client.off(SocketIoService.ROOM_STATS_INIT);
        this.client.off(SocketIoService.ROOM_STATS);
      }
    } catch (exception) {
    }
    this.client = io(this.urlService.liveDataUrl);
    if (ce === ConnectionEvent.CONNECT || ce === ConnectionEvent.RECONNECT) {
      this.client.emit(SocketIoService.ROOM_STATS_INIT, 'init');
      this.client.on(SocketIoService.ROOM_STATS, message => {
        this.stats.next(mapTimeAndCountry(message));
      });
      this.client.on(SocketIoService.ROOM_STATS_INIT, message => {
        const tenminStat = <any[][]>message[4];
        const hourStat = <any[][]>message[3];
        const dailyStat = <any[][]>message[2];
        const yearlyStat = <any[][]>message[1];
        const allStat = <any[][]>message[0];
        this.tenminStatInit.next(tenminStat.map(stat => mapTenminStat(stat)));
        this.statInit.next({type: 'hour', stats: hourStat.map(stat => mapStatEntry(stat) )});
        this.statInit.next({type: 'day', stats: dailyStat.map(stat => mapStatEntry(stat) )});
        this.statInit.next({type: 'thisyr', stats: dailyStat.map(stat => mapStatEntry(stat) )});
        this.statInit.next({type: 'thisyr', stats: yearlyStat.map(stat => mapStatEntry(stat) )});
        this.statInit.next({type: 'all', stats: allStat.map(stat => mapStatEntry(stat) )});
      } );
    }
  }
  public liveStrokeData(ce: ConnectionEvent) {
    try {
      this.liveDataConnected = false;
      if (this.client) {
        this.client.off(SocketIoService.ROOM_STROKE_INIT);
        this.client.off(SocketIoService.ROOM_STROKES);
        this.client.off('error');
        this.client.off('connect_error');
      }
    } catch (exception) {
    }
    this.client = io(this.urlService.liveDataUrl);
    if (ce === ConnectionEvent.CONNECT || ce === ConnectionEvent.RECONNECT) {
      this.liveDataConnected = true;
      this.client.on(SocketIoService.ROOM_STROKE_INIT, message => {
        this.strokesInit.next(JSON.parse(message).map(m => mapStroke(m)));
      });
      this.client.on(SocketIoService.ROOM_STROKES, message => {
        this.strokes.next(mapStroke(JSON.parse(message)));
      } );
      this.client.on('error', () => {
        this.liveDataConnected = false;
      });
      this.client.on('connect_error', () => {
        this.liveDataConnected = false;
      });
    }
  }
}

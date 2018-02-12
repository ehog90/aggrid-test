import {AfterContentInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GridOptions} from 'ag-grid';
import {GeocodingService} from 'app/geocoding.service';
import {SettingsService} from '../settings.service';
import {Visibility, VisibilityService} from '../visibility.service';
import {ConnectionEvent, SocketIoService} from '../socket-io.service';
import {LocationService} from '../location.service';
import {ISimpleLocation, IStroke} from 'app/interfaces';
import {Subscription} from 'rxjs/Subscription';
import {getDistanceAndBearing} from '../geo-utils';
import {DistanceCellTemplateComponent} from '../distance-cell-template/distance-cell-template.component';
import {CountryCellTemplateComponent} from '../country-cell-template/country-cell-template.component';
import {LocalityCellTemplateComponent} from "../locality-cell-template/locality-cell-template.component";

@Component({
  selector: 'app-live-main',
  templateUrl: './live-main.component.html',
  styleUrls: ['./live-main.component.scss']
})
export class LiveMainComponent implements OnInit, AfterContentInit, OnDestroy {
  public columns = [
    {headerName: 'Távolság', field: 'dist', sort: 'asc', cellRendererFramework: DistanceCellTemplateComponent},
    {headerName: 'Ország', field: 'countryCode', cellRendererFramework: CountryCellTemplateComponent},
    {headerName: 'Település', field: 'settlement', cellRendererFramework: LocalityCellTemplateComponent},
    {headerName: 'Alrégió', field: 'subRegion', cellRendererFramework: LocalityCellTemplateComponent},
    {headerName: 'Régió', field: 'region', cellRendererFramework: LocalityCellTemplateComponent}
  ];
  public gridOptions = <GridOptions>{
    debug: true,
    columnDefs: this.columns,
    rowData: [],
    enableSorting: true,
    enableColResize: true,
    getRowNodeId: (row) => {
      return row.id;
    },
    onGridReady: () => {
      this.initialize();
    },
    onGridSizeChanged: () => {
      this.gridOptions.api.sizeColumnsToFit();
    }
  };
  public location: number[] = [];
  public currentLocationDetails: ISimpleLocation = null;
  private bulkSubscription: Subscription;
  private individualSubscription: Subscription;

  constructor(private locationService: LocationService,
              private socketIOService: SocketIoService,
              private visibilityService: VisibilityService,
              private geocodingService: GeocodingService,
              private settingsService: SettingsService) {
    if (this.settingsService.continuousGeoLocation) {
      this.locationService.startWatch();
      this.locationService.locationSubject
        .throttleTime(10000)
        .subscribe(location => {
          this.location = location;
          this.geocodingService.getPlacesForLocation(location).then(l => {
            this.currentLocationDetails = l;
            this.currentLocationDetails.location = location;
            this.gridOptions.rowData.forEach(x => {
              x.dd = getDistanceAndBearing(this.location, x.latLng);
              x.dist = x.dd[0];
            });
            this.gridOptions.api.updateRowData({update: this.gridOptions.rowData});
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

  public initialize() {
    this.socketIOService.liveStrokeData(ConnectionEvent.CONNECT);
    this.individualSubscription = this.socketIOService.strokes.subscribe(stroke => {
      const now = new Date().getTime() / 1000;
      stroke.dd = getDistanceAndBearing(this.location, stroke.latLng);
      stroke.dist = stroke.dd[0];
      this.gridOptions.api.updateRowData({add: [stroke]});
      this.gridOptions.api.sizeColumnsToFit();
    });
    this.bulkSubscription = this.socketIOService.strokesInit.subscribe(strokesInit => {
      strokesInit.forEach(x => {
        x.dd = getDistanceAndBearing(this.location, x.latLng);
        x.dist = x.dd[0];
      });
      this.gridOptions.api.updateRowData({add: strokesInit});
      this.gridOptions.api.sizeColumnsToFit();
    });
  }
  ngOnInit() {
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
  ngAfterContentInit(): void {
  }

}

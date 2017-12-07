import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import { TenminStatComponent } from './tenmin-stat/tenmin-stat.component';
import {SocketIoService} from './socket-io.service';
import {UrlService} from 'app/url.service';
import { StatComponent } from './stat/stat.component';
import {VisibilityService} from './visibility.service';
import {LocationService} from './location.service';
import { LiveStrokesComponent } from './live-strokes/live-strokes.component';
import {GeocodingService} from './geocoding.service';
import { SettingsComponent } from './settings/settings.component';
import {SettingsService} from './settings.service';
import {LocalStorageService} from './local-storage.service';
import { CurrentLocationComponent } from './current-location/current-location.component';
import { LiveMainComponent } from './live-main/live-main.component';
import {AgGridModule} from 'ag-grid-angular';
import { DistanceCellTemplateComponent } from './distance-cell-template/distance-cell-template.component';
import { CountryCellTemplateComponent } from './country-cell-template/country-cell-template.component';
import { LocalityCellTemplateComponent } from './locality-cell-template/locality-cell-template.component';
@NgModule({
  declarations: [
    AppComponent,
    TenminStatComponent,
    StatComponent,
    LiveStrokesComponent,
    SettingsComponent,
    CurrentLocationComponent,
    LiveMainComponent,
    DistanceCellTemplateComponent,
    CountryCellTemplateComponent,
    LocalityCellTemplateComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule,
    AgGridModule.withComponents([DistanceCellTemplateComponent, CountryCellTemplateComponent, LocalityCellTemplateComponent])
  ],
  providers: [
    UrlService,
    SocketIoService,
    VisibilityService,
    LocationService,
    GeocodingService,
    LocalStorageService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

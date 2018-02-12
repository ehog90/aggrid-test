import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../settings.service';
import {GeocodingService} from '../geocoding.service';
import {LocationService} from "../location.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  searchString = '';

  constructor(public settingsService: SettingsService,
              private geocodingService: GeocodingService,
              private locationService: LocationService) {
  }

  ngOnInit() {
  }

  async searchPlace() {
    if (this.searchString.length < 1) {
      alert('Adj meg települést!');
      return;
    }
    const location = await this.geocodingService.searchPlaceWithGoogle(this.searchString);
    if (location) {
      this.settingsService.staticPlace = location;
      this.settingsService.continuousGeoLocation = false;
    }
    else {
      alert('Nincs találat.');
    }
  }

  async getCurrentPlace() {
    try {
      const currentCoordinates = await this.locationService.currentPosition();
      const location = await this.geocodingService.getPlacesForLocation(currentCoordinates);
      if (location) {
        this.settingsService.staticPlace = location;
      }
      else {
        alert('Helymeghatározási hiba.');
      }
    }
    catch (exc) {
      alert(`Hiba: ${exc.toString()}`);
    }

  }

}

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ICarmenGeoJSONEntity, IGoogleMapsQueryResponse} from './carmen-geojson';
import {ISimpleLocation} from './interfaces';
import 'rxjs/add/operator/map';

@Injectable()
export class GeocodingService {
  constructor(private http: Http) {
  }

  async getPlacesForLocation(location: number[]): Promise<ISimpleLocation> {
    return this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location[0]}%2C${location[1]}.json`,
      {
        params: {
          access_token: 'pk.eyJ1IjoiZWhvZzkwIiwiYSI6ImFjMDM2NThkNjY0NmRjOWMyYWVkZmI0ODQ4NDBjNmFjIn0.v6pNvB5M0rR7c8gyY9Ltcw',
          types: 'place,address',
          limit: 1
        }
      }).map(response => this.flattenMapboxAddress(<ICarmenGeoJSONEntity>response.json())).toPromise();
  }

  async searchPlace(query: string): Promise<ISimpleLocation> {
    return this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token: 'pk.eyJ1IjoiZWhvZzkwIiwiYSI6ImFjMDM2NThkNjY0NmRjOWMyYWVkZmI0ODQ4NDBjNmFjIn0.v6pNvB5M0rR7c8gyY9Ltcw',
          types: 'place,address',
          limit: 1
        }
      }).map(response => this.flattenMapboxAddress(<ICarmenGeoJSONEntity>response.json())).toPromise();
  }

  async searchPlaceWithGoogle(query: string): Promise<ISimpleLocation> {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          key: 'AIzaSyBFVV25DW_k-ckag8C6691iceQghBMfjeo',
          address: query,
          limit: 1
        }
      }).map(response => this.flattenGoogleMapsAddress(<IGoogleMapsQueryResponse>response.json())).toPromise();
  }

  private flattenMapboxAddress(geoJson: ICarmenGeoJSONEntity): ISimpleLocation {
    if (geoJson.features.length > 0) {
      const firstFeature = geoJson.features[0];
      const address = firstFeature.text;
      let region = null;
      let country = 'xx';
      firstFeature.context.forEach(context => {
        if (context.id.indexOf('region') !== -1) {
          region = context.text;
        }
        else if (context.id.indexOf('country') !== -1) {
          country = context.short_code;
        }
      });
      return {
        countryCode: country,
        address: address,
        location: firstFeature.center,
        region: region
      };
    }
    return null;
  }

  private flattenGoogleMapsAddress(response: IGoogleMapsQueryResponse): ISimpleLocation {
    if (response.results.length > 0) {
      const firstFeature = response.results[0];
      let streetNumber = null;
      let settlement = null;
      let address = null;
      let region = null;
      let neighborhood = null;
      let region2 = null;
      let country = 'xx';
      firstFeature.address_components.forEach(ac => {
        if (ac.types.indexOf('street_number') !== -1) {
          streetNumber = ac.long_name;
        }
        else if (ac.types.indexOf('route') !== -1) {
          address = ac.long_name;
        }
        else if (ac.types.indexOf('locality') !== -1) {
          settlement = ac.long_name;
        }
        else if (ac.types.indexOf('neighborhood') !== -1) {
          neighborhood = ac.long_name;
        }
        else if (ac.types.indexOf('administrative_area_level_1') !== -1) {
          region = ac.long_name;
        }
        else if (ac.types.indexOf('administrative_area_level_2') !== -1) {
          region2 = ac.long_name;
        }
        else if (ac.types.indexOf('country') !== -1) {
          country = ac.short_name.toLowerCase();
        }
      });
      let finalAddress = null;
      if (neighborhood && settlement) {
        settlement = `${settlement}, ${neighborhood}`;
      }
      else if (neighborhood && !settlement) {
        settlement = neighborhood;
      }
      if (streetNumber && settlement && address) {
        finalAddress = `${settlement}, ${address} ${streetNumber}`;
      }
      else if (settlement && address) {
        finalAddress = `${settlement}, ${address}`;
      }
      else if (settlement) {
        finalAddress = settlement;
      }
      else if (address) {
        finalAddress = address;
      }
      return {
        countryCode: country,
        address: finalAddress,
        location: [firstFeature.geometry.location.lng, firstFeature.geometry.location.lat],
        region: region
      };
    }
    return null;
  }


}

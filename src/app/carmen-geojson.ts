/**
 * Created by ehog on 2017. 04. 29..
 */


export interface ICarmenGeoJSONEntity {
  type: string;
  query: any;
  features: ICarmenGeoJSONFeature[];
}

export interface IGeometry {
  type: string;
  coordinates: number;
}

export interface ICarmenContext {
  id: string;
  wikidata?: string;
  short_code?: string;
  text: string;
}

export interface ICarmenGeoJSONFeature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: any[];
  text: string;
  place_name: string;
  bbox: number[];
  center: number[];
  geometry: IGeometry;
  context: ICarmenContext[];
}

export interface IGoogleMapsQueryResponse {
  results: IGoogleMapsQueryResult[];
  status: string;
}
export interface IGoogleMapsQueryResult {
  address_components: IGoogleMapsAddressComponent[];
  formatted_address: string;
  geometry: IGoogleMapsGeometry;
  place_id: string;
  types: string[];
}

export interface IGoogleMapsAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface IGoogleMapsGeometry {
  location: IGoogleMapsLocation;
  location_type: string;
  viewport: {
    northeast: IGoogleMapsLocation;
    southwest: IGoogleMapsLocation;
  };
}

export interface IGoogleMapsLocation {
  lat: number;
  lng: number;
}

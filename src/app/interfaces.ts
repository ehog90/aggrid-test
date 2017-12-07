/**
 * Created by ehog on 2017. 04. 14..
 */

export interface ITimeAndCountry {
  time: Date;
  countryCode: string;
}

export interface ITenminStat {
  timeStart: Date;
  all: number;
  entries: ITenminStatEntry[];
}
export interface ITenminStatEntry {
  countryCode: string;
  countryName: string;
  count: number;
}

export interface IStatInit {
  stats: IStatEntry[];
  type: string;
}

export interface IStatEntry {
  countryCode: string;
  countryName: string;
  count: number;
  lastStroke: Date;
  percent: number;
}

export interface IStroke {
  id: number;
  latLng: number[];
  countryCode: string;
  countryName: string;
  region: string;
  subRegion: string;
  settlement: string;
  street: string;
  suburb: string;
  azimuth: number;
  time: Date;
  sunElevation: number;
  dist?: number;
  dd?: any[];
}

export interface ISimpleLocation {
  address: string;
  location: number[];
  countryCode: string;
  region: string;
}

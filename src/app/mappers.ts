import {IStatEntry, IStroke, ITenminStat, ITenminStatEntry, ITimeAndCountry} from './interfaces';
import {getCountryName} from "./country-resolver";
/**
 * Created by ehog on 2017. 04. 14..
 */


export function mapTenminStat(data: any[]): ITenminStat {
  return {
    timeStart: new Date(data[0]),
    all: data[1],
    entries: data[2].map(entry => mapTenminStatEntry(entry))
  };
}

export function mapTenminStatEntry(data: any[]): ITenminStatEntry {
  return {
    countryCode: data[0],
    countryName: getCountryName(data[0], 'hu'),
    count: data[1]
  };
}

export function mapTimeAndCountry(dataString: string): ITimeAndCountry {
  const data = JSON.parse(dataString);
  return {
    time: new Date(data[0]),
    countryCode: data[1]
  };
}

export function mapStatEntry(data: any[]): IStatEntry {
  return {
    countryCode: data[0],
    countryName: getCountryName(data[0], 'hu'),
    count: data[1],
    lastStroke: new Date(data[2]),
    percent: data[3]
  };
}
export function mapStroke(data: any[]): IStroke {
  return {
    id: data[0],
    latLng: data[1],
    countryCode: data[2],
    countryName: getCountryName(data[2], 'hu'),
    region: data[3],
    subRegion: data[4],
    settlement: data[5],
    street: data[6],
    suburb: data[7],
    azimuth: data[8],
    time: new Date(data[9]),
    sunElevation: data[10]
  };
}

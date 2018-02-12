import {countryNameData} from './country-data';

export function getCountryName(countryCode: string, languageCode: string): string {
  if (!countryCode) {
    return '??';
  }
  if (countryNameData[languageCode]) {
    if (countryNameData[languageCode][countryCode]) {
      return countryNameData[languageCode][countryCode];
    }
    return countryCode;
  }
  return `${countryCode} ??`;
}

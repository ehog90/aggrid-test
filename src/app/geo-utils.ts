/**
 * Created by ehog on 2017. 04. 23..
 */

export function toRadians(num: number): number {
  return num * (Math.PI / 180);
}
export function toDegrees(num: number): number {
  return num * (180 / Math.PI);
}

export function getBearing(start: number[], end: number[]): number {
  const startLat = toRadians(start[1]);
  const startLong = toRadians(start[0]);
  const endLat = toRadians(end[1]);
  const endLong = toRadians(end[0]);

  let dLong = endLong - startLong;
  const dPhi = Math.log(Math.tan(endLat / 2.0 + Math.PI / 4.0) / Math.tan(startLat / 2.0 + Math.PI / 4.0));
  if (Math.abs(dLong) > Math.PI) {
    if (dLong > 0.0) {
      dLong = -(2.0 * Math.PI - dLong);
    } else {
      dLong = (2.0 * Math.PI + dLong);
    }
  }

  return (toDegrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
}

function getDistance(start: number[], end: number[]) {
  const radlat1 = toRadians(start[1]);
  const radlat2 = toRadians(end[1]);
  const theta = start[0] - end[0];
  const radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return dist;
}

export function getDistanceAndBearing(start: number[], end: number[]): any[] {
  const bearing = getBearing(start, end);
  return [
    getDistance(start, end),
    bearing,
    getCompassKey(bearing)
  ];
}

const compassKeys = ['É', 'ÉÉK', 'ÉK', 'KÉK', 'K', 'KDK', 'DK', 'DDK', 'D', 'DDNY', 'DNY', 'NYDNY', 'NY', 'NYÉNY', 'ÉNY', 'ÉÉNY'];
export function getCompassKey(bearing: number): string {
  return compassKeys[Math.round((bearing + 11.0) / 22.5) % 16];
}



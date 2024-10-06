import { IGeoJson } from "src/api/epic/interface/epic.interface";

export function haversineDistance(
  [lat1, lon1]: number[],
  [lat2, lon2]: number[]
): number {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
}

export function getPolygonCentroid(polygonCoords: number[][]): number[] {
  let [xSum, ySum] = [0, 0];
  const numPoints = polygonCoords.length;

  polygonCoords.forEach(([lat, lon]) => {
    xSum += lat;
    ySum += lon;
  });

  return [xSum / numPoints, ySum / numPoints];
}

export function findClosestCoordinate(
  geoJson: IGeoJson,
  coordinates: number[][]
): number {
  let referencePoint: number[] = [];

  if (geoJson.type === "Point") {
    referencePoint = geoJson.coordinates as number[];
  } else if (geoJson.type === "Polygon") {
    referencePoint = getPolygonCentroid(geoJson.coordinates as number[][]);
  } else {
    throw new Error("Unsupported GeoJSON type");
  }

  let closestCoord: number[] = [];
  let index: number = -1;
  let minDistance = Infinity;

  coordinates.forEach((coord, idx) => {
    const distance = haversineDistance(referencePoint, coord);
    if (distance < minDistance) {
      minDistance = distance;
      closestCoord = coord;
      index = idx;
    }
  });

  return index;
}

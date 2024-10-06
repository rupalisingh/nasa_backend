export interface IGeoJson {
    type: "Point" | "Polygon";
    coordinates: number[] | number[][];
  }
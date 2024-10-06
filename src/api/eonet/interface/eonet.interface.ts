export interface IEvents {
  id: string;
  title: string;
  description: string;
  link: string;
  categories: {
    id: number;
    title: string;
  }[];
  sources: {
    id: string;
    url: string;
  }[];
  geometries: {
    date: string;
    type: string;
    coordinates: number[];
  }[];
}

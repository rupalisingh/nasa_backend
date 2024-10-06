import axios from "axios";
import config from "src/loaders/config";
import { IGeoJson } from "../interface/epic.interface";
import { findClosestCoordinate } from "src/utils/helperFunctions";

export class EpicService {
  epicBaseUrl: string;
  epicArchiveUrl: string;

  constructor() {
    this.epicBaseUrl = config.epicBaseUrl;
    this.epicArchiveUrl = config.epicArchiveUrl;
  }

  public async getEpicImageUrl(payload: { date: string; geoJson: IGeoJson }) {
    const { date, geoJson } = payload;
    // date should be YYYY-MM-DD format
    const dateArray = date.split('-');
    if(dateArray.length !== 3) {
        throw new Error('Invalid date.')
    }
    const {data} = await axios.get(`${this.epicBaseUrl}/natural/date/${date}`)
    const coordinates = data?.map((item: {centroid_coordinates: {lat: number, lon:number}}) => {
        return [item.centroid_coordinates.lat, item.centroid_coordinates.lon];
    })

    const index = findClosestCoordinate(geoJson, coordinates);
    if(index < 0){
        throw new Error('Unable to find image url.')
    }
    const imageName = data[index]?.image;
    const url = `${this.epicArchiveUrl}/natural/${dateArray[0]}/${dateArray[1]}/${dateArray[2]}/png/${imageName}.png`;
    return url;
  }
}

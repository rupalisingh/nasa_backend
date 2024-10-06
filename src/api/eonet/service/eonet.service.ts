import axios from "axios";
import { title } from "process";
import config from "src/loaders/config";
import { IEvents } from "../interface/eonet.interface";

export class EonetService {
  eonetBaseUrl: string;

  constructor() {
    this.eonetBaseUrl = config.eonetBaseUrl;
  }

  public async getAllCategories(): Promise<{ id: string; title: string }[]> {
    const { data }: { data: { categories: { id: string; title: string }[] } } =
      await axios.get(`${this.eonetBaseUrl}/categories`);
    const response = data?.categories?.map((item) => ({
      id: item.id,
      title: item.title,
    }));
    return response;
  }

  public async getEvents(days: number) {
    const {
      data,
    }: {
      data: {
        events: IEvents[];
      };
    } = await axios.get(`${this.eonetBaseUrl}/events?days=${days}`);
    const response = data?.events;
    return response;
  }
}

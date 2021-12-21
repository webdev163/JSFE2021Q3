import { ToysData } from './types';

export default class Data {
  public static async getJson(): Promise<ToysData> {
    const url = 'https://raw.githubusercontent.com/webdev163/image-data/master/toysdata.json';
    const res: Response = await fetch(url);
    const data: ToysData = await res.json();
    return data;
  }
}

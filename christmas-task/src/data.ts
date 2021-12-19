import { ToysDataType } from './types';

export default class Data {
  public static async getJson(): Promise<ToysDataType> {
    const url: string = 'https://raw.githubusercontent.com/webdev163/image-data/master/toysdata.json';
    const res: Response = await fetch(url);
    const data: ToysDataType = await res.json();
    return data;
  }
}

import { CallbackFunctionGeneric, HttpStatusCode, PartialOptions } from '../../types';

class Loader {
  baseLink: string;
  options: object;

  constructor(baseLink: string, options: object) {
    this.baseLink = baseLink;
    this.options = options;
  }

  protected getResp<ISources>(
    { endpoint, options = {} }: { endpoint: string; options?: Partial<PartialOptions> },
    callback: CallbackFunctionGeneric<ISources> = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  public errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === HttpStatusCode.UNAUTHORIZED || res.status === HttpStatusCode.NOT_FOUND)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  public makeUrl(options: Record<string, never>, endpoint: string): string {
    const urlOptions: { [prop: string]: string } = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key: string) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load<ISources>(method: string, endpoint: string, callback: CallbackFunctionGeneric<ISources>, options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then((data: ISources) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;

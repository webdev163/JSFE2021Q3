// Interfaces

export interface IData {
  status: string;
  totalResults: number;
  articles: IArticlesObj[];
}

export interface ISources {
  status: string;
  sources: ISourcesObj[];
}

export interface IArticlesObj {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
}

export interface ISourcesObj {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
}

// Types

export type CallbackFunctionGeneric<T> = (data: T) => void;

export type PartialOptions = {
  sources: string
}

// Enums

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

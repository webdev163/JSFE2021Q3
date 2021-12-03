export interface IData {
  status: string;
  totalResults: number;
  articles: IArticlesObj[];
}

export interface ISources extends IData {
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

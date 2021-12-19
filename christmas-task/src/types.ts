export interface StateInterface {
  query: string;
  sort: string;
  shape: string[];
  color: string[];
  size: string[];
  favorite: boolean;
  minCount: number;
  maxCount: number;
  minYear: number;
  maxYear: number;
}

export interface ToyInterface {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export type ToysDataType = ToyInterface[];

export enum SortTypes {
  alphabetSort = 'alphabet-sort',
  alphabetSortReversed = 'alphabet-sort-reverse',
  yearSort = 'year-sort',
  yearSortReversed = 'year-sort-reverse',
}

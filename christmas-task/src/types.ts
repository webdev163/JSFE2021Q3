export interface State {
  query: string;
  sort: string;
  shape: string[];
  color: string[];
  size: string[];
  isFavorite: boolean;
  minCount: number;
  maxCount: number;
  minYear: number;
  maxYear: number;
}

export interface Toy {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  isFavorite: boolean;
}

export type ToysData = Toy[];

export enum SortTypes {
  alphabetSort = 'alphabet-sort',
  alphabetSortReversed = 'alphabet-sort-reverse',
  yearSort = 'year-sort',
  yearSortReversed = 'year-sort-reverse',
}

export enum SliderValues {
  sliderCountMin = 1,
  sliderCountMax = 12,
  sliderYearMin = 1940,
  sliderYearMax = 2020,
}

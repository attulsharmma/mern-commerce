export interface IFilterItem {
  id: string;
  label: string;
}
export interface IFilterOptions {
  [key: string]: IFilterItem[];
}
export interface IFilters {
  [key: string]: string[]; // example: { brand: ["apple", "samsung"], category: ["phones"] }
}

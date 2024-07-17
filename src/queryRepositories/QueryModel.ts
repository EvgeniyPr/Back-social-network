export enum SortDirection {
  asc = "asc",
  desc = "desc",
}
type SortBy = string;
type sortDirection = "asc" | "desc" | "ascending" | "descending" | 1 | -1;

export interface QueryModel {
  pageNumber?: string;
  pageSize?: string;
  sortBy?: "name" | "title";
  sortDirection?: sortDirection;
  searchNameTerm?: string;
}

export interface sanitizedQueryModel {
  pageNumber: number;
  pageSize: number;
  sortBy: SortBy;
  sortDirection: sortDirection;
  searchNameTerm?: any;
  skipPage: number;
  sort: {
    [key in SortBy]: sortDirection;
  };
}

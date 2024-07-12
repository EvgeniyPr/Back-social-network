export interface QueryBlogModel {
  pageNumber?: string;
  pageSize?: string;
  sortBy?: "name" | "title";
  sortDirection?: "asc" | "desc" | "ascending" | "descending" | 1 | -1;
  searchNameTerm?: string;
}
export enum SortDirection {
  asc = "asc",
  desc = "desc",
}

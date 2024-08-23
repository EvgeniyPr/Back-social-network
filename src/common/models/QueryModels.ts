import { SortBy, sortDirection, SortDirection, typeId } from "./Pagination";
export interface QueryModel {
  pageNumber?: string;
  pageSize?: string;
  sortBy?: "name" | "title";
  sortDirection?: SortDirection;
  searchNameTerm?: string;
  searchLoginTerm?: string;
  searchEmailTerm?: string;
}

export interface SanitizedQueryModel {
  pageNumber: number;
  pageSize: number;
  sortBy: SortBy;
  sortDirection: sortDirection;
  searchNameTerm: SearchFilter;
  skipPage: number;
  sort: {
    [key in SortBy]: sortDirection;
  };
}
export interface SearchFilter {
  [key: string]:
    | { $regex: string; $options: string }
    | {
        $or: Array<{
          login?: {
            $regex: string;
            $options: "i";
          };
          email?: {
            $regex: string;
            $options: "i";
          };
        }>;
      }
    | {};
}

export type PaginationFilter = SearchFilter & {
  [key in typeId]?: string;
};

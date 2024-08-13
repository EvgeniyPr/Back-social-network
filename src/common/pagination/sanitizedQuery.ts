import {
  QueryModel,
  sanitizedQueryModel,
  SortDirection,
} from "../../common/models/QueryModels";
import { createSearchBy } from "./createSearchBy";

export interface SearchTerms {
  searchNameTerm: string;
  searchLoginTerm: string;
  searchEmailTerm: string;
}

export const sanitizedQuery = (
  query: QueryModel,
  searchBy: string = ""
): sanitizedQueryModel => {
  const pageNumber = query.pageNumber ? +query.pageNumber : 1;
  const pageSize = query.pageSize ? +query.pageSize : 10;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const searchTerms = {
    searchNameTerm: query.searchNameTerm ? query.searchNameTerm : "",
    searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : "",
    searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm : "",
  };
  const sortDirection = query.sortDirection
    ? query.sortDirection
    : SortDirection.desc;

  const paginationSettings: sanitizedQueryModel = {
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
    searchNameTerm: createSearchBy(searchTerms, searchBy),
    skipPage: (pageNumber - 1) * pageSize,
    sort: { [sortBy]: sortDirection },
  };
  return paginationSettings;
};

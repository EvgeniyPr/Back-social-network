import {
  QueryModel,
  SanitizedQueryModel,
} from "../../common/models/QueryModels";
import { SortDirection } from "../models/Pagination";

import { createSearchBy } from "./createSearchBy";

export const sanitizedQuery = (
  query: QueryModel,
  searchBy: string = ""
): SanitizedQueryModel => {
  const paginationSettings: SanitizedQueryModel = {
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    pageSize: query.pageSize ? +query.pageSize : 10,
    sortBy: query.sortBy ? query.sortBy : "createdAt",
    sortDirection: query.sortDirection
      ? query.sortDirection
      : SortDirection.desc,
    searchNameTerm: createSearchBy(query, searchBy),
    skipPage:
      (query.pageNumber ? +query.pageNumber - 1 : 0) *
      (query.pageSize ? +query.pageSize : 10),
    sort: {
      [query.sortBy || "createdAt"]: query.sortDirection || SortDirection.desc,
    },
  };
  return paginationSettings;
};

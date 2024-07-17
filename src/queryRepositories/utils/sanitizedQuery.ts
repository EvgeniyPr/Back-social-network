import { QueryModel, sanitizedQueryModel, SortDirection } from "../QueryModel";

export const sanitizedQuery = (
  query: QueryModel,
  searchBy: string = ""
): sanitizedQueryModel => {
  const pageNumber = query.pageNumber ? +query.pageNumber : 1;
  const pageSize = query.pageSize ? +query.pageSize : 10;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const searchNameTerm = query.searchNameTerm ? query.searchNameTerm : null;
  const sortDirection = query.sortDirection
    ? query.sortDirection
    : SortDirection.desc;

  const paginationSettings: sanitizedQueryModel = {
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
    searchNameTerm: searchNameTerm
      ? { [searchBy]: { $regex: searchNameTerm, $options: "i" } }
      : {},
    skipPage: (pageNumber - 1) * pageSize,
    sort: { [sortBy]: sortDirection },
  };
  return paginationSettings;
};

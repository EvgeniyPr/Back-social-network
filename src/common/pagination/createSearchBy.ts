import { QueryModel, SearchFilter } from "../../common/models/QueryModels";
import { searchBy } from "../models/Pagination";

export const createSearchBy = (query: QueryModel, searchField: string = "") => {
  const searchTerms = {
    searchNameTerm: query.searchNameTerm || "",
    searchLoginTerm: query.searchLoginTerm || "",
    searchEmailTerm: query.searchEmailTerm || "",
  };
  let searchFilter = {};
  if (searchField === searchBy.name || searchField === searchBy.title) {
    searchFilter = {
      [searchField]: { $regex: searchTerms.searchNameTerm, $options: "i" },
    };
  }
  if (
    searchField === searchBy.loginOrEmail &&
    (searchTerms.searchLoginTerm || searchTerms.searchEmailTerm.length)
  ) {
    searchFilter = {
      $or: [
        { login: { $regex: searchTerms.searchLoginTerm, $options: "i" } },
        { email: { $regex: searchTerms.searchEmailTerm, $options: "i" } },
      ],
    };
  }
  return searchFilter as SearchFilter;
};

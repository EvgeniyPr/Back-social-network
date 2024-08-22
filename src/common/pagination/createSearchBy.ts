import { QueryModel, searchBy } from "../../common/models/QueryModels";

export const createSearchBy = (query: QueryModel, searchField: string = "") => {
  const searchTerms = {
    searchNameTerm: query.searchNameTerm || "",
    searchLoginTerm: query.searchLoginTerm || "",
    searchEmailTerm: query.searchEmailTerm || "",
  };
  let filter = {};
  if (searchField === searchBy.name || searchField === searchBy.title) {
    filter = {
      [searchField]: { $regex: searchTerms.searchNameTerm, $options: "i" },
    };
  }
  if (
    searchField === searchBy.loginOrEmail &&
    (searchTerms.searchLoginTerm || searchTerms.searchEmailTerm.length)
  ) {
    filter = {
      $or: [
        { login: { $regex: searchTerms.searchLoginTerm, $options: "i" } },
        { email: { $regex: searchTerms.searchEmailTerm, $options: "i" } },
      ],
    };
  }
  return filter;
};

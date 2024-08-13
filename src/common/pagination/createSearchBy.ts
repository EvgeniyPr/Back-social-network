import { searchBy } from "../../common/models/QueryModels";
import { SearchTerms } from "./sanitizedQuery";

export const createSearchBy = (
  searchTerms: SearchTerms,
  searchField: string = ""
) => {
  const { searchNameTerm, searchLoginTerm, searchEmailTerm } = searchTerms;

  let filter = {};

  if (searchField === searchBy.name || searchField === searchBy.title) {
    filter = { [searchField]: { $regex: searchNameTerm, $options: "i" } };
  }
  if (
    searchField === searchBy.loginOrEmail &&
    (searchLoginTerm || searchEmailTerm.length)
  ) {
    filter = {
      $or: [
        { login: { $regex: searchLoginTerm, $options: "i" } },
        { email: { $regex: searchEmailTerm, $options: "i" } },
      ],
    };
  }
  return filter;
};

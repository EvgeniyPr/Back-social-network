import { SearchTerms } from "./sanitizedQuery";

export const createSearchBy = (
  searchTerms: SearchTerms,
  searchBy: string = ""
) => {
  const { searchNameTerm, searchLoginTerm, searchEmailTerm } = searchTerms;

  let filter = {};

  if (searchBy === "name" || searchBy === "title") {
    filter = { [searchBy]: { $regex: searchNameTerm, $options: "i" } };
  }
  if (
    searchBy === "loginOrEmail" &&
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

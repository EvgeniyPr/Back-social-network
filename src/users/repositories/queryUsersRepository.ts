import { userCollection } from "../../db/mongo-db";
import { UsersOutputModelToFrontWithPagination } from "../models/UserModels";
import { QueryModel } from "../../common/models/QueryModels";
import { getItemsWithPagination } from "../../common/pagination/getItemsWithPagination";
import { sanitizedQuery } from "../../common/pagination/sanitizedQuery";
import { searchBy } from "../../common/models/Pagination";

export const queryUsersRepository = {
  async getUsers(
    query: QueryModel
  ): Promise<UsersOutputModelToFrontWithPagination> {
    return (await getItemsWithPagination(
      null,
      sanitizedQuery(query, searchBy.loginOrEmail),
      userCollection
    )) as UsersOutputModelToFrontWithPagination;
  },
};

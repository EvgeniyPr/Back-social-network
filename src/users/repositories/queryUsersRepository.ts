import { userCollection } from "../../db/mongo-db";
import { UserOutputModelToFront } from "../models/UserModels";
import { QueryModel } from "../../common/models/QueryModels";
import { getItemsWithPagination } from "../../common/pagination/getItemsWithPagination";
import { sanitizedQuery } from "../../common/pagination/sanitizedQuery";
import { IPagination, searchBy } from "../../common/models/Pagination";

export const queryUsersRepository = {
  async getUsers(
    query: QueryModel
  ): Promise<IPagination<UserOutputModelToFront[]>> {
    return (await getItemsWithPagination(
      null,
      sanitizedQuery(query, searchBy.loginOrEmail),
      userCollection
    )) as IPagination<UserOutputModelToFront[]>;
  },
};

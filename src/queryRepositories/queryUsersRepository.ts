import { ObjectId } from "mongodb";
import { userCollection } from "../db/mongo-db";
import {
  UserOutputModelToFront,
  UsersOutputModelFromDb,
  UsersOutputModelToFrontWithPagination,
} from "../users/models/UserModels";
import { QueryModel, searchBy } from "./models/QueryModels";
import { getItemsWithPagination } from "./utils/getItemsWithPagination";
import { sanitizedQuery } from "./utils/sanitizedQuery";

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
  async getUser(id: string): Promise<UserOutputModelToFront | null> {
    const user = (await userCollection.findOne(
      {
        _id: new ObjectId(id),
      },
      { projection: { password: 0 } }
    )) as UsersOutputModelFromDb;
    if (user) {
      const { _id, ...rest } = user;
      return { id: _id.toString(), ...rest };
    }
    return null;
  },
};

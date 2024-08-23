import { ObjectId } from "mongodb";
import { userCollection } from "../../db/mongo-db";
import { UserInputModel } from "../models/UserInputModel";
import {
  UserOutputModelToFront,
  UsersOutputModelFromDb,
} from "../models/UserModels";

export const usersMongoDbRepository = {
  async createUser(data: UserInputModel) {
    const responce = await userCollection.insertOne(data);
    return responce;
  },

  async deleteUser(id: string) {
    const responce = await userCollection.deleteOne({ _id: new ObjectId(id) });
    return responce;
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

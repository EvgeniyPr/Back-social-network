import { ObjectId } from "mongodb";
import { userCollection } from "../../db/mongo-db";
import { UserInputModel } from "../models/UserInputModel";

export const usersMongoDbRepository = {
  async createUser(data: UserInputModel) {
    const responce = await userCollection.insertOne(data);
    return responce;
  },

  async deleteUser(id: string) {
    const responce = await userCollection.deleteOne({ _id: new ObjectId(id) });
    return responce;
  },
};

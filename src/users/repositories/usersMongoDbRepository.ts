import { ObjectId } from "mongodb";
import { userCollection } from "../../db/mongo-db";
import { UserModelFromBd, UserViewModel } from "../models/UserViewModel";
import { UserInputModel } from "../models/UserInputModel";

export const usersMongoDbRepository = {
  async createUser(data: UserInputModel) {
    const newUser = await userCollection.insertOne({
      ...data,
      createAt: new Date().toISOString(),
    });
    const user = await this.getUser(newUser.insertedId.toString());
    return user;
  },
  async getUser(id: string): Promise<UserViewModel | null> {
    const user = (await userCollection.findOne({
      _id: new ObjectId(id),
    })) as UserModelFromBd;
    if (user) {
      const { _id, ...rest } = user;
      return { id: _id.toString(), ...rest };
    }
    return null;
  },
  async getAllUsers() {
    const allUsers = await userCollection.find({}).toArray();
    return allUsers;
  },
  //@ts-ignore
  async deleteUser(id) {
    const info = await userCollection.deleteOne({ _id: new ObjectId(id) });
    return info;
  },
};

import { userCollection } from "../../db/mongo-db";
import { LoginInputModel } from "../models/LoginInputModel";

export const authMongoDbRepository = {
  async getUserByLoginOrEmail(data: LoginInputModel) {
    const user = await userCollection.findOne({
      $or: [{ login: data.loginOrEmail }, { email: data.loginOrEmail }],
    });

    return user;
  },
};

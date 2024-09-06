import { userCollection } from "../../db/mongo-db";
import { LoginInputModel } from "../models/LoginInputModel";
import {
  RegistrationUserModel,
  RegistrationUserModelFromDb,
} from "../models/RegistrationUserModel";

export const authMongoDbRepository = {
  async getUserByLoginOrEmail(data: LoginInputModel) {
    const user = await userCollection.findOne({
      $or: [{ login: data.loginOrEmail }, { email: data.loginOrEmail }],
    });
    return user;
  },
  async createUser(data: RegistrationUserModel) {
    const responce = await userCollection.insertOne(data);
    return responce;
  },
  async findUserByConfirmationCode(code: string) {
    const user = (await userCollection.findOne({
      "emailConfirmation.confirmationCode": code,
    })) as RegistrationUserModelFromDb | null;
    return user;
  },
  async confirmUserRegistration(code: string) {
    const responce = await userCollection.updateOne(
      {
        "emailConfirmation.confirmationCode": code,
      },
      { $set: { "emailConfirmation.isConfirmed": true } }
    );
    return responce;
  },
  async deleteUserByConfirmationCode(code: string) {
    const responce = await userCollection.deleteOne({
      "emailConfirmation.confirmationCode": code,
    });
    return responce;
  },
};

import { createHash } from "../../common/utils/createHash";
import { userCollection } from "../../db/mongo-db";
import { UserInputModel } from "../models/UserInputModel";
import { usersMongoDbRepository } from "../repositories/usersMongoDbRepository";
import bcrypt from "bcrypt";

export const userService = {
  async createUser(data: UserInputModel) {
    const { password } = data;
    const newUser = {
      ...data,
      password: await createHash(password),
      createdAt: new Date().toISOString(),
    };
    const responce = await usersMongoDbRepository.createUser(newUser);
    return await usersMongoDbRepository.getUser(responce.insertedId.toString());
  },
  async deleteUser(id: string) {
    const responce = await usersMongoDbRepository.deleteUser(id);
    return responce.deletedCount > 0;
  },
  async loginAndMailAreUnique(data: string) {
    const existingUser = await userCollection.findOne({
      $or: [{ login: data }, { email: data }],
    });
    if (existingUser) {
      if (existingUser.login === data) {
        throw new Error("the login is not unique");
      }
      if (existingUser.email === data) {
        throw new Error("the email is not unique");
      }
    }
  },
};

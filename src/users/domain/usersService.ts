import { userCollection } from "../../db/mongo-db";
import { queryUsersRepository } from "../../queryRepositories/queryUsersRepository";
import { UserInputModel } from "../models/UserInputModel";
import { usersMongoDbRepository } from "../repositories/usersMongoDbRepository";
import bcrypt from "bcrypt";

export const userService = {
  async createUser(data: UserInputModel) {
    const { password } = data;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = {
      ...data,
      password: hash,
      createAt: new Date().toISOString(),
    };
    const responce = await usersMongoDbRepository.createUser(newUser);
    return await queryUsersRepository.getUser(responce.insertedId.toString());
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

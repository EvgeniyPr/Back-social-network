import { LoginInputModel } from "../models/LoginInputModel";
import { authMongoDbRepository } from "../repositories/authMongoDbRepository";
import bcrypt from "bcrypt";

export const authService = {
  async checkLoginAndPassword(data: LoginInputModel) {
    const user = await authMongoDbRepository.getUserByLoginOrEmail(data);
    if (user) {
      const authenticationResult = await bcrypt.compare(
        data.password,
        user.password
      );
      return authenticationResult;
    }
    return false;
  },
};

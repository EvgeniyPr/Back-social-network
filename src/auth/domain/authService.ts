import { UsersOutputModelFromDb } from "../../users/models/UserModels";
import { LoginInputModel } from "../models/LoginInputModel";
import { authMongoDbRepository } from "../repositories/authMongoDbRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SETTINGS } from "../../settings/settings";

export const authService = {
  async guard(data: LoginInputModel) {
    const user = (await authMongoDbRepository.getUserByLoginOrEmail(
      data
    )) as UsersOutputModelFromDb;
    if (
      user &&
      (await this.checkLoginAndPassword(data.password, user.password!))
    ) {
      return this.createToken(user._id.toString());
    }
    return false;
  },
  checkLoginAndPassword(incomingPassword: string, userPasswordInDB: string) {
    return bcrypt.compare(incomingPassword, userPasswordInDB);
  },
  createToken(userId: string) {
    return jwt.sign({ userId }, SETTINGS.SECRET_KEY!, { expiresIn: "500h" });
  },
};

import { UsersOutputModelFromDb } from "../../users/models/UserModels";
import { LoginInputModel } from "../models/LoginInputModel";
import { authMongoDbRepository } from "../repositories/authMongoDbRepository";
import bcrypt from "bcrypt";
import { jwtService } from "../../jwt/domain/jwtService";
import { MeViewModel } from "../models/MeViewModel";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";

export const authService = {
  async guard(data: LoginInputModel) {
    const user = (await authMongoDbRepository.getUserByLoginOrEmail(
      data
    )) as UsersOutputModelFromDb;
    if (
      user &&
      (await this.checkLoginAndPassword(data.password, user.password))
    ) {
      return {
        accessToken: jwtService.createToken(
          user.email,
          user.login,
          user._id.toString()
        ),
      };
    }
    return false;
  },
  checkLoginAndPassword(incomingPassword: string, userPasswordInDB: string) {
    return bcrypt.compare(incomingPassword, userPasswordInDB);
  },
  // getInformation(token: string) {
  //   const informationFromToken: MeViewModel | null =
  //     jwtService.getUserByToken(token);
  //   return informationFromToken;
  // },
};

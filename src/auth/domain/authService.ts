import { UsersOutputModelFromDb } from "../../users/models/UserModels";
import { LoginInputModel } from "../models/LoginInputModel";
import { authMongoDbRepository } from "../repositories/authMongoDbRepository";
import bcrypt from "bcrypt";
import { jwtService } from "../../jwt/domain/jwtService";
import { RegistrationInputData } from "../models/RegistrationInputData";
import { createHash } from "../../common/utils/createHash";
import { v4 as uuidv4 } from "uuid";
import { add } from "date-fns";
import { RegistrationUserModel } from "../models/RegistrationUserModel";
import { emailAdapter } from "../../adapters/email-adapter";

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
  async registrateUser(data: RegistrationInputData): Promise<true | null> {
    const { password } = data;
    const newUser: RegistrationUserModel = {
      ...data,
      password: await createHash(password),
      createdAt: new Date().toISOString(),
      emailConfirmation: {
        confirmationCode: uuidv4(),
        expirationDate: add(new Date(), { hours: 1 }),
        isConfirmed: false,
      },
    };
    const responce = await authMongoDbRepository.createUser(newUser);
    if (responce.acknowledged) {
      try {
        await emailAdapter.sendEmail(
          newUser.email,
          newUser.emailConfirmation.confirmationCode
        );
      } catch (e) {
        await authMongoDbRepository.deleteUserByConfirmationCode(
          newUser.emailConfirmation.confirmationCode
        );
        console.log("error", e);
      }
      return responce.acknowledged;
    }
    return null;
  },

  async confirmRegistration(code: string): Promise<boolean> {
    const responce = await authMongoDbRepository.confirmUserRegistration(code);
    return !!responce.modifiedCount;
  },

  async confirmResendingRegistration(email: string): Promise<true | false> {
    const newConformationCode: string = uuidv4().toString();
    const conformationCodeIsUpdated =
      await authMongoDbRepository.updateConfirmationCode(
        email,
        newConformationCode
      );
    if (conformationCodeIsUpdated) {
      await emailAdapter.sendEmail(email, newConformationCode);
      return true;
    }
    return false;
  },

  checkLoginAndPassword(incomingPassword: string, userPasswordInDB: string) {
    return bcrypt.compare(incomingPassword, userPasswordInDB);
  },
  async userAvailabilityByConfirmationCodeMiddleware(code: string) {
    const user = await authMongoDbRepository.findUserByConfirmationCode(code);
    if (!user) {
      throw new Error("No user with such confirmation code");
    }
    return user;
  },
};

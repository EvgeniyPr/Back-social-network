import { ObjectId } from "mongodb";

export interface RegistrationUserModel {
  email: string;
  login: string;
  password: string;
  createdAt: string;
  emailConfirmation: {
    confirmationCode: string;
    expirationDate: Date;
    isConfirmed: false;
  };
}
export interface RegistrationUserModelFromDb extends RegistrationUserModel {
  _id: ObjectId;
}

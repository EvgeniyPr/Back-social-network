import { ObjectId } from "mongodb";

export interface UserModel {
  login: string;
  email: string;
  password: string;
  createAt: string;
}
export interface UserViewModel extends UserModel {
  id: string;
}
export interface UserModelFromBd extends UserModel {
  _id: ObjectId;
}

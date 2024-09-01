import { ObjectId } from "mongodb";

export interface UserOutPutModel {
  login: string;
  email: string;
  createAt: string;
}

export interface UserOutputModelToFront extends UserOutPutModel {
  id: string;
}
export interface UsersOutputModelFromDb extends UserOutPutModel {
  _id: ObjectId;
  password: string;
}

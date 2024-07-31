import { ObjectId } from "mongodb";

export interface UserOutputModelToFront {
  id: string;
  login: string;
  email: string;
  createAt: string;
}
export interface UsersOutputModelFromDb {
  _id: ObjectId;
  login: string;
  email: string;
  password?: string;
  createAt: string;
}
export interface UsersOutputModelToFrontWithPagination {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: UserOutputModelToFront[];
}

import { ObjectId } from "mongodb";

export type BlogsOutputModelFromDb = {
  _id: ObjectId;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt?: string;
  isMembership?: boolean;
};

// export type BlogsOutputModelFromDb = BlogOutputModelToFrontFromDb[] | [];

// export type BlogsOutputModelFromDb = {
//   _id: string;
//   name: string;
//   description: string;
//   websiteUrl: string;
//   createdAt?: string;
//   isMembership?: boolean;
// };

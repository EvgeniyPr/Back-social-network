import { ObjectId } from "mongodb";

export interface PostOutputModel {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt?: string;
}

export interface PostsOutputModelFromDb extends PostOutputModel {
  _id: ObjectId;
}

export interface PostOutputModelToFront extends PostOutputModel {
  id: string;
}
export interface PostsOutputModelToFrontWithPagination {
  pageCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: PostOutputModelToFront[];
}

import { ObjectId } from "mongodb";
// import { PaginationModel } from "../../models/PaginationModel";

interface BlogOutputModel {
  name: string;
  description: string;
  websiteUrl: string;
  isMembership?: boolean;
  createdAt?: string;
}

export interface BlogOutputModelToFront extends BlogOutputModel {
  id: string;
}
export interface BlogsOutputModelFromDb extends BlogOutputModel {
  _id: ObjectId;
}

export interface BlogsOutputModelToFrontWithPagination {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: BlogOutputModelToFront[];
}

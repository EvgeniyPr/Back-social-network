import { ObjectId } from "mongodb";

export interface CommentViewModel {
  content: string;
  commentatorInfo: { userId: string; userLogin: string };
  createdAt?: string;
}
export interface CommentOutputModelFromDb extends CommentViewModel {
  _id: ObjectId;
}
export interface CommentOutputModelToFront extends CommentViewModel {
  id: string;
}

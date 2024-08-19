import { MeViewModel } from "../../auth/models/MeViewModel";
import { CommentInputModel } from "../models/CommentInputModel";
import { CommentOutputModelFromDb } from "../models/CommenViewModel";
import { commentsMongoDbRepository } from "../repositories/commentsMongoDbRepository";

export const commentsService = {
  async createComment(
    { userId, login }: { userId: string; login: string },
    comment: CommentInputModel,
    postId: string
  ) {
    const newComment = {
      ...comment,
      commentatorInfo: { userId, userLogin: login },
      postId: postId,
      createdAt: new Date().toISOString(),
    };
    const responce = await commentsMongoDbRepository.createComment(newComment);
    const commentfromDb = (await commentsMongoDbRepository.getComment(
      responce.insertedId.toString()
    )) as CommentOutputModelFromDb;
    const { _id, ...rest } = commentfromDb;
    return { id: _id.toString(), ...rest };
  },
  async deleteComment(commentId: string, user: MeViewModel) {
    const commentToDelete = await commentsMongoDbRepository.getComment(
      commentId
    );
    if (!commentToDelete) {
      return null;
    }
    if (commentToDelete?.commentatorInfo.userId === user.userId) {
      const responce = await commentsMongoDbRepository.deleteComment(commentId);
      if (!responce.deletedCount) {
        return null;
      }
      return responce.deletedCount;
    }
    return "FORBIDDEN_403";
  },
};

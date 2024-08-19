import { ObjectId } from "mongodb";
import { commentsCollection } from "../../db/mongo-db";
import { CommentViewModel } from "../models/CommenViewModel";

export const commentsMongoDbRepository = {
  async createComment(newComment: CommentViewModel) {
    const info = await commentsCollection.insertOne(newComment);
    return info;
  },
  async getComment(commentId: string) {
    const comment = await commentsCollection.findOne(
      { _id: new ObjectId(commentId) },
      { projection: { postId: 0 } }
    );
    return comment;
  },
  async deleteComment(commentId: string) {
    console.log(commentId);
    const info = await commentsCollection.deleteOne({
      _id: new ObjectId(commentId),
    });
    return info;
  },
};

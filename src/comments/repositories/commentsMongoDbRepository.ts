import { ObjectId } from "mongodb";
import { commentsCollection } from "../../db/mongo-db";
import { CommentViewModel } from "../models/CommenViewModel";
import { CommentInputModel } from "../models/CommentInputModel";

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
  async updateComment(commentId: string, data: CommentInputModel) {
    const info = await commentsCollection.updateOne(
      {
        _id: new ObjectId(commentId),
      },
      { $set: data }
    );
    console.log("info", info);
    return info;
  },
  async deleteComment(commentId: string) {
    const info = await commentsCollection.deleteOne({
      _id: new ObjectId(commentId),
    });
    return info;
  },
};

import { ObjectId } from "mongodb";
import { commentsCollection } from "../../db/mongo-db";

export const queryCommentsRepository = {
  async getComment(id: string) {
    const comment = await commentsCollection.findOne({
      _id: new ObjectId(id),
    });
    if (comment) {
      const { _id, ...rest } = comment;
      return { id: _id.toString(), ...rest };
    }
    return null;
  },
  async getAllCommentsForSpecifiedPost(postId: string) {
    const comments = await commentsCollection.find({ postId }).toArray();
    console.log(comments);
  },
};

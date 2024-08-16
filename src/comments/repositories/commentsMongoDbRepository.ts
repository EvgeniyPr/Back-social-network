import { ObjectId } from "mongodb";
import { commentsCollection } from "../../db/mongo-db";

export const commentsMongoDbRepository = {
  //@ts-ignore
  async createComment(newComment) {
    const info = await commentsCollection.insertOne(newComment);
    return info;
  },
  async getComment(id: string) {
    const comment = await commentsCollection.findOne({ _id: new ObjectId(id) });
    return comment;
  },
};

import { ObjectId } from "mongodb";
import { commentsCollection, postCollection } from "../../db/mongo-db";
import { PostInputModel } from "../models/PostInputModel";
import { PostsOutputModelFromDb } from "../models/PostOutputModel";

export const postsMongoDbRepository = {
  async createPost(newPost: PostInputModel) {
    const info = await postCollection.insertOne(newPost);
    return info;
  },
  async updatePost(id: string, data: PostInputModel) {
    const info = await postCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data } }
    );
    return info;
  },
  async deletePost(id: string) {
    const info = await postCollection.deleteOne({ _id: new ObjectId(id) });
    return info;
  },
  async getPost(id: string): Promise<PostsOutputModelFromDb | null> {
    const post = (await postCollection.findOne({
      _id: new ObjectId(id),
    })) as PostsOutputModelFromDb;
    if (post) {
      return post;
    }
    return null;
  },
};

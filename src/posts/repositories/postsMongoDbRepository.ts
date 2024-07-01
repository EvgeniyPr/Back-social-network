import { ObjectId } from "mongodb";
import { postCollection } from "../../db/mongo-db";
import { PostsOutputModelFromDb } from "../models/PostOutputModelToFront";
import { PostInputModel } from "../models/PostInputModel";

export const postsMongoDbRepository = {
  async getPosts(blogId = ""): Promise<PostsOutputModelFromDb[]> {
    if (blogId === "") {
      const postsFromDb = (await postCollection
        .find()
        .toArray()) as PostsOutputModelFromDb[];
      return postsFromDb;
    }
    const posts = (await postCollection
      .find({
        blogId,
      })
      .toArray()) as PostsOutputModelFromDb[];
    return posts;
  },

  async getPost(id: string): Promise<PostsOutputModelFromDb> {
    const postFromDb = (await postCollection.findOne({
      _id: new ObjectId(id),
    })) as PostsOutputModelFromDb;
    return postFromDb;
  },

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
};

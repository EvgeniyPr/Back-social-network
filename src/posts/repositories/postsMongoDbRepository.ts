import { ObjectId } from "mongodb";
import { postCollection } from "../../db/mongo-db";
import {
  PostOutputModelToFront,
  PostsOutputModelFromDb,
} from "../models/PostOutputModelToFront";
import { PostInputModel } from "../models/PostInputModel";
import { blogsMongoDBRepository } from "../../blogs/repositories/blogsMongoDbRepository";
import { errors } from "../../errors/errors";

export const postsMongoDbRepository = {
  async getPosts(): Promise<PostOutputModelToFront[]> {
    const postsFromDb = (await postCollection
      .find()
      .toArray()) as PostsOutputModelFromDb[];
    return postsFromDb.map((post) => {
      const { _id, ...rest } = post;
      return { id: _id.toString(), ...rest };
    });
  },

  async getPost(id: string): Promise<PostOutputModelToFront | null> {
    const postFromDb = (await postCollection.findOne({
      _id: new ObjectId(id),
    })) as PostsOutputModelFromDb;
    if (postFromDb) {
      const { _id, ...rest } = postFromDb;
      return { id: _id.toString(), ...rest };
    }
    return null;
  },

  async createPost(data: PostInputModel) {
    const blog = await blogsMongoDBRepository.getBlog(data.blogId);
    if (!blog) {
      return errors;
    }
    const info = await postCollection.insertOne({
      ...data,
      isMembership: false,
      createdAt: new Date().toISOString(),
      blogName: blog.name,
    });
    const postedPost = await this.getPost(info.insertedId.toString());
    if (!postedPost) {
      return errors;
    }
    return postedPost;
  },
  async updatePost(id: string, data: PostInputModel) {
    const info = await postCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data } }
    );
    return info.matchedCount > 0;
  },
  async deletePost(id: string) {
    const info = await postCollection.deleteOne({ _id: new ObjectId(id) });
    return info.deletedCount > 0;
  },
};

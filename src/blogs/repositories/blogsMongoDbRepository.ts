import { ObjectId } from "mongodb";
import { blogCollection } from "../../db/mongo-db";
import { BlogInputModel } from "../models/BlogInputModel";
import {
  BlogOutputModelToFront,
  BlogsOutputModelFromDb,
} from "../models/BlogOutputModel";

export const blogsMongoDBRepository = {
  async createBlog(newBlog: BlogInputModel) {
    const info = await blogCollection.insertOne(newBlog);
    return info;
  },
  async updateBlog(id: string, data: BlogInputModel) {
    const info = await blogCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data } }
    );
    return info;
  },
  async deleteBlog(id: string) {
    const info = await blogCollection.deleteOne({ _id: new ObjectId(id) });
    return info;
  },
  async getBlog(id: string): Promise<BlogsOutputModelFromDb | null> {
    const blog = (await blogCollection.findOne({
      _id: new ObjectId(id),
    })) as BlogsOutputModelFromDb;
    if (blog) {
      return blog;
    }
    return null;
  },
};

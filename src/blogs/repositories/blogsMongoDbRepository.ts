import { ObjectId } from "mongodb";
import { blogCollection } from "../../db/mongo-db";
import { BlogsOutputModelFromDb } from "../models/BlogOutputModel";
import { BlogInputModel } from "../models/BlogInputModel";

export const blogsMongoDBRepository = {
  async getBlogs(): Promise<BlogsOutputModelFromDb[]> {
    const blogsFromDb = (await blogCollection
      .find()
      .toArray()) as BlogsOutputModelFromDb[];
    return blogsFromDb;
  },

  async getBlog(id: string): Promise<BlogsOutputModelFromDb> {
    const blogFromDB = (await blogCollection.findOne({
      _id: new ObjectId(id),
    })) as BlogsOutputModelFromDb;
    return blogFromDB;
  },

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
};

import { ObjectId } from "mongodb";
import { blogCollection } from "../../db/mongo-db";
import {
  BlogOutputModelToFront,
  BlogsOutputModelFromDb,
} from "../models/BlogOutputModel";
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

  async createBlog(data: BlogInputModel) {
    const info = await blogCollection.insertOne({
      ...data,
      isMembership: false,
      createdAt: new Date().toISOString(),
    });
    return this.getBlog(info.insertedId.toString());
  },

  async updateBlog(id: string, data: BlogInputModel) {
    const info = await blogCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data } }
    );
    return info.matchedCount > 0;
  },
  async deleteBlog(id: string) {
    const info = await blogCollection.deleteOne({ _id: new ObjectId(id) });
    return info.deletedCount > 0;
  },

  async blogNameByIdIsExist(id: string) {
    const blogFromDB = await this.getBlog(id);
    if (!blogFromDB) {
      throw new Error("There are no blogs with such id");
    }
  },
};

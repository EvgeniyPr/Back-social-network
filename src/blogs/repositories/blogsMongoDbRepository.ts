import { ObjectId } from "mongodb";
import { blogCollection } from "../../db/mongo-db";
import {
  BlogOutputModelToFront,
  BlogsOutputModelFromDb,
} from "../models/BlogOutputModel";
import { BlogInputModel } from "../models/BlogInputModel";

export const blogsMongoDBRepository = {
  async getBlogs(): Promise<BlogOutputModelToFront[]> {
    const blogsFromDb = (await blogCollection
      .find()
      .toArray()) as BlogsOutputModelFromDb[];
    return blogsFromDb.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));
  },

  async getBlog(id: string): Promise<BlogOutputModelToFront | null> {
    const blogFromDB = (await blogCollection.findOne({
      _id: new ObjectId(id),
    })) as BlogsOutputModelFromDb;
    if (blogFromDB) {
      const { _id, ...rest } = blogFromDB;
      return { id: _id.toString(), ...rest };
    }
    return null;
  },

  async createBlog(data: BlogInputModel) {
    const info = await blogCollection.insertOne({ ...data });
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

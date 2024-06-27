import { ObjectId } from "mongodb";
import { blogCollection } from "../../db/mongo-db";
import {
  BlogOutputModelToFront,
  BlogsOutputModelFromDb,
} from "../models/BlogOutputModel";
import { BlogInputModel } from "../models/BlogInputModel";
import { blogsMongoDBRepository } from "../repositories/blogsMongoDbRepository";

export const blogsService = {
  async getBlogs(): Promise<BlogOutputModelToFront[]> {
    const blogs = await blogsMongoDBRepository.getBlogs();
    return blogs.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));
  },

  async getBlog(id: string): Promise<BlogOutputModelToFront | null> {
    const blog = await blogsMongoDBRepository.getBlog(id);
    if (blog) {
      const { _id, ...rest } = blog;
      return { id: _id.toString(), ...rest };
    }
    return null;
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

import { ObjectId } from "mongodb";
import { blogCollection } from "../../db/mongo-db";
import { BlogOutputModelToFront } from "../models/BlogOutputModelToFront";
import { BlogsOutputModelFromDb } from "../models/BlogsOutputModelFromDb";
import { BlogInputModel } from "../models/BlogInputModel";

export const blogsMongoDBRepository = {
  async getBlogs(): Promise<BlogOutputModelToFront[]> {
    const blogsFromDb = (await blogCollection
      .find()
      .toArray()) as BlogsOutputModelFromDb[];
    return this.mapBlogsToOutputModel(blogsFromDb);
  },

  async getBlog(id: string): Promise<BlogOutputModelToFront | null> {
    const blog = (await blogCollection.findOne({
      _id: new ObjectId(id),
    })) as BlogsOutputModelFromDb;
    return this.changeBlogToOutputModel(blog);
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

  changeBlogToOutputModel(blog: BlogsOutputModelFromDb) {
    const { _id, ...rest } = blog;
    return { id: _id.toString(), ...rest };
  },

  mapBlogsToOutputModel(
    inputArray: BlogsOutputModelFromDb[]
  ): BlogOutputModelToFront[] {
    return inputArray.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));
  },
};

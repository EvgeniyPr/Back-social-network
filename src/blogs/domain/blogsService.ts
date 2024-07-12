import { BlogOutputModelToFront } from "../models/BlogOutputModel";
import { BlogInputModel } from "../models/BlogInputModel";
import { blogsMongoDBRepository } from "../repositories/blogsMongoDbRepository";

export const blogsService = {
  async getBlog(id: string): Promise<BlogOutputModelToFront | null> {
    const blog = await blogsMongoDBRepository.getBlog(id);
    if (blog) {
      const { _id, ...rest } = blog;
      return { id: _id.toString(), ...rest };
    }
    return null;
  },

  async createBlog(data: BlogInputModel) {
    const newBlog = {
      ...data,
      isMembership: false,
      createdAt: new Date().toISOString(),
    };
    const response = await blogsMongoDBRepository.createBlog(newBlog);
    return await this.getBlog(response.insertedId.toString());
  },

  async updateBlog(id: string, data: BlogInputModel) {
    const response = await blogsMongoDBRepository.updateBlog(id, data);
    return response.matchedCount > 0;
  },

  async deleteBlog(id: string) {
    const responce = await blogsMongoDBRepository.deleteBlog(id);
    return responce.deletedCount > 0;
  },

  async blogWithIdIsExist(id: string) {
    const blogFromDB = await this.getBlog(id);
    if (!blogFromDB) {
      throw new Error("There are no blogs with such id");
    }
  },
};

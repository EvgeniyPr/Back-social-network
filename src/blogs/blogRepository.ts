import { db } from "../db/db";
import { BlogOutputModel } from "./models/BlogOutputModel";
import { BlogInputModel } from "./models/BlogInputModel";
import { findIndex } from "../utils/findIndex";

export const blogsRepository = {
  async getBlogs(): Promise<BlogOutputModel[]> {
    return db.blogs;
    // if no response from db we have to add error using try catch
    // try {
    //   throw new Error("Error!!!!");
    //   return db.blogs;
    // } catch (e: any) {
    //   console.log(e.message);
    //   return { errorsMessages: [{ message: e.message, field: "" }] };
    // }
  },
  async getBlog(id: string): Promise<BlogOutputModel | undefined> {
    const blogs = await this.getBlogs();
    return blogs.find((b) => b.id === id);
  },
  async createBlog(data: BlogInputModel): Promise<BlogOutputModel> {
    const blogs = await this.getBlogs();
    const newBlog = { ...data, id: (Date.now() + Math.random()).toString() };
    blogs.push(newBlog);
    return newBlog;
  },

  async updateBlog(id: string, data: BlogInputModel): Promise<boolean> {
    const blogs = await this.getBlogs();
    const indexBlogToUpdate = findIndex(id, blogs);
    if (indexBlogToUpdate > -1) {
      blogs[indexBlogToUpdate] = { ...blogs[indexBlogToUpdate], ...data };
      return true;
    }
    return false;
  },

  async deleteBlog(id: string): Promise<boolean> {
    const blogs = await this.getBlogs();
    const indexBlogToDelete = findIndex(id, blogs);
    if (indexBlogToDelete > -1) {
      blogs.splice(indexBlogToDelete, 1);
      return true;
    }
    return false;
  },
};

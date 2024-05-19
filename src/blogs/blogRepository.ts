import { db } from "../db/db";
import { BlogOutputModel } from "./models/BlogOutputModel";
import { BlogInputModel } from "./models/BlogInputModel";
import { findIndex } from "../utils/findIndex";

export const blogsRepository = {
  async getBlogs(): Promise<BlogOutputModel[]> {
    return db.blogs;
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
  async findBlogNameById(blogId: string) {
    const blogs = await this.getBlogs();
    const blogNameById = blogs.find((b) => b.id === blogId);
    if (blogNameById) {
      return blogNameById.name;
    }
    throw new Error("There are no blogs with such id");
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

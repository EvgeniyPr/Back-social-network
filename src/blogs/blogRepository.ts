import { error } from "console";
import { db } from "../db/db";
import { BlogOutputModel } from "./models/BlogOutputModel";
import { APIErrorResult } from "../videos/models/video-error-models/APIErrorResult";
import { BlogInputModel } from "./models/BlogInputModel";

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
  async getBlog(id: string): Promise<BlogOutputModel> {
    // the if no response from db
    return db.blogs.find((b) => b.id === id);
  },
  async createBlog(data: BlogInputModel): Promise<BlogOutputModel> {
    // the if no response from db
    const newBlog = { ...data, id: (Date.now() + Math.random()).toString() };
    db.blogs.push(newBlog);
    return newBlog;
  },
};

import { blogsRepository } from "../blogs/blogRepository";
import { db } from "../db/db";
import { findIndex } from "../utils/findIndex";
import { PostInputModel } from "./models/PostInputModel";
import { PostOutputModel } from "./models/PostOutputModel";

export const postRepository = {
  async getPosts() {
    return db.posts;
    // if no response from db we have to add error using try catch
    // try {
    //   throw new Error("Error!!!!");
    //   return db.blogs;
    // } catch (e: any) {
    //   console.log(e.message);
    //   return { errorsMessages: [{ message: e.message, field: "" }] };
    // }
  },
  async getPost(id: string): Promise<PostOutputModel | undefined> {
    const blogs = await this.getPosts();
    return blogs.find((b) => b.id === id);
  },

  async findBlogNameById(blogId: string) {
    const blogs = await blogsRepository.getBlogs();
    const blogNameById = blogs.find((b) => b.id === blogId);
    if (blogNameById) {
      return blogNameById.name;
    }
    throw new Error("There are no blogs with such id");
  },

  async createPost(data: PostInputModel) {
    const posts = await this.getPosts();
    try {
      const blogName = await this.findBlogNameById(data.blogId);
      const newBlog = {
        ...data,
        id: (Date.now() + Math.random()).toString(),
        blogName: blogName,
      };
      posts.push(newBlog);
      return newBlog;
    } catch (e: any) {
      return { error: e.message };
    }
  },

  async updatePost(id: string, data: PostInputModel): Promise<boolean> {
    const posts = await this.getPosts();
    const indexPostToUpdate = findIndex(id, posts);
    if (indexPostToUpdate > -1) {
      posts[indexPostToUpdate] = { ...posts[indexPostToUpdate], ...data };
      return true;
    }
    return false;
  },

  async deletePost(id: string) {
    const posts = await this.getPosts();
    const indexPostToDelete = findIndex(id, posts);
    if (indexPostToDelete > -1) {
      posts.splice(indexPostToDelete, 1);
      return true;
    }
    return false;
  },
};

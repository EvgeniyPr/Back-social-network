import { blogsRepository } from "../../blogs/repositories/blogsRepository";
import { db } from "../../db/db";
import { findIndex } from "../../utils/findIndex";
import { PostInputModel } from "../models/PostInputModel";
import { PostOutputModelToFront } from "../models/PostOutputModel";

export const postRepository = {
  async getPosts() {
    return db.posts;
  },
  async getPost(id: string): Promise<PostOutputModelToFront | undefined> {
    const posts = await this.getPosts();
    return posts.find((b) => b.id === id);
  },
  async createPost(data: PostInputModel) {
    const posts = await this.getPosts();
    try {
      const blogName = await blogsRepository.findBlogNameById(data.blogId);
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
8;

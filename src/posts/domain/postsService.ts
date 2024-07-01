import { PostOutputModelToFront } from "../models/PostOutputModelToFront";
import {
  PostInputModel,
  PostInputModelForSpecificBlog,
} from "../models/PostInputModel";
import { errors } from "../../errors/errors";
import { postsMongoDbRepository } from "../repositories/postsMongoDbRepository";
import { blogsService } from "../../blogs/domain/blogsService";
import { PostOutputModel } from "../models/PostOutputModel";

export const postsService = {
  async getPosts(id = ""): Promise<PostOutputModelToFront[]> {
    const posts = await postsMongoDbRepository.getPosts(id);
    return posts.map((post) => {
      const { _id, ...rest } = post;
      return { id: _id.toString(), ...rest };
    });
  },
  async getPost(id: string): Promise<PostOutputModelToFront | null> {
    const post = await postsMongoDbRepository.getPost(id);
    if (post) {
      const { _id, ...rest } = post;
      return { id: _id.toString(), ...rest };
    }
    return null;
  },

  async createPost(data: PostInputModel) {
    const blog = await this.getBlogByID(data.blogId);
    if (blog) {
      const newPost = {
        ...data,
        createdAt: new Date().toISOString(),
        blogName: blog.name,
      };
      const createdPost = await this.blogCreationResponse(newPost);
      if (createdPost) {
        return createdPost;
      }
      return errors;
    }
    return errors;
  },

  async createPostForSpecificBlog(
    blogId: string,
    data: PostInputModelForSpecificBlog
  ) {
    const blog = await this.getBlogByID(blogId);
    if (blog) {
      const newPost = {
        ...data,
        createdAt: new Date().toISOString(),
        blogName: blog.name,
        blogId: blog.id,
      };
      const createdPost = await this.blogCreationResponse(newPost);
      if (createdPost) {
        return createdPost;
      }
      return errors;
    }
    return errors;
  },

  async updatePost(id: string, data: PostInputModel) {
    const responce = await postsMongoDbRepository.updatePost(id, data);
    return responce.matchedCount > 0;
  },
  async deletePost(id: string) {
    const info = await postsMongoDbRepository.deletePost(id);
    return info.deletedCount > 0;
  },

  async getBlogByID(blogId: string) {
    const blog = await blogsService.getBlog(blogId);
    return blog;
  },
  async blogCreationResponse(newPost: PostOutputModel) {
    const responce = await postsMongoDbRepository.createPost(newPost);
    const postedPost = await this.getPost(responce.insertedId.toString());
    return postedPost;
  },
};

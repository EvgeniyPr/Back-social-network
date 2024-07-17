import { PostOutputModelToFront } from "../models/PostOutputModel";
import {
  PostInputModel,
  PostInputModelForSpecificBlog,
} from "../models/PostInputModel";
import { postsMongoDbRepository } from "../repositories/postsMongoDbRepository";
import { blogsService } from "../../blogs/domain/blogsService";
import { PostOutputModel } from "../models/PostOutputModel";
import { errors } from "../../middlewares/errorCheckMiddleware";

export const postsService = {
  async getPost(id: string): Promise<PostOutputModelToFront | null> {
    const post = await postsMongoDbRepository.getPost(id);
    const { _id, ...rest } = post;
    return { id: _id.toString(), ...rest };
  },
  async createPost(data: PostInputModel) {
    const blog = await this.getBlogByID(data.blogId);
    if (blog) {
      const newPost = {
        ...data,
        createdAt: new Date().toISOString(),
        blogName: blog.name,
      };
      const createdPost = await this.creatNewPostResponse(newPost);
      if (createdPost) {
        return createdPost;
      }
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
      const createdPost = await this.creatNewPostResponse(newPost);
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
  async creatNewPostResponse(newPost: PostOutputModel) {
    const responce = await postsMongoDbRepository.createPost(newPost);
    const postedPost = await this.getPost(responce.insertedId.toString());
    return postedPost;
  },
};

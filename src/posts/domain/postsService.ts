import {
  PostInputModel,
  PostInputModelForSpecificBlog,
} from "../models/PostInputModel";
import { postsMongoDbRepository } from "../repositories/postsMongoDbRepository";
import { PostOutputModel } from "../models/PostOutputModel";
import { errors } from "../../middlewares/errorCheckMiddleware";
import { queryBlogsRepository } from "../../queryRepositories/queryBlogsRepository";
import { queryPostsRepository } from "../../queryRepositories/queryPostsRepository";

export const postsService = {
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
    const blog = await queryBlogsRepository.getBlog(blogId);
    return blog;
  },
  async creatNewPostResponse(newPost: PostOutputModel) {
    const responce = await postsMongoDbRepository.createPost(newPost);
    const postedPost = await queryPostsRepository.getPost(
      responce.insertedId.toString()
    );
    return postedPost;
  },
};

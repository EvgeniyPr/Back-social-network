import {
  PostInputModel,
  PostInputModelForSpecificBlog,
} from "../models/PostInputModel";
import { postsMongoDbRepository } from "../repositories/postsMongoDbRepository";
import { PostOutputModel } from "../models/PostOutputModel";
import { errors } from "../../common/middlewares/errorCheckMiddleware";
import { queryPostsRepository } from "../repositories/queryPostsRepository";
import { blogsMongoDBRepository } from "../../blogs/repositories/blogsMongoDbRepository";

export const postsService = {
  async createPost(data: PostInputModel) {
    const blog = await blogsMongoDBRepository.getBlog(data.blogId);
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
    const blog = await blogsMongoDBRepository.getBlog(blogId);
    if (blog) {
      const newPost = {
        ...data,
        createdAt: new Date().toISOString(),
        blogName: blog.name,
        blogId: blog._id.toString(),
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
  async creatNewPostResponse(newPost: PostOutputModel) {
    const responce = await postsMongoDbRepository.createPost(newPost);
    const postedPost = await queryPostsRepository.getPost(
      responce.insertedId.toString()
    );
    return postedPost;
  },
};

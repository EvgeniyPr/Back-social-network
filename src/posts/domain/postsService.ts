import { PostOutputModelToFront } from "../models/PostOutputModelToFront";
import { PostInputModel } from "../models/PostInputModel";
import { errors } from "../../errors/errors";
import { postsMongoDbRepository } from "../repositories/postsMongoDbRepository";
import { blogsService } from "../../blogs/domain/blogsService";

export const postsService = {
  async getPosts(): Promise<PostOutputModelToFront[]> {
    const posts = await postsMongoDbRepository.getPosts();
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
    const blog = await blogsService.getBlog(data.blogId);
    if (!blog) {
      return errors;
    }
    const newPost = {
      ...data,
      createdAt: new Date().toISOString(),
      blogName: blog.name,
    };
    const responce = await postsMongoDbRepository.createPost(newPost);
    const postedPost = await this.getPost(responce.insertedId.toString());
    if (!postedPost) {
      return errors;
    }
    return postedPost;
  },
  async updatePost(id: string, data: PostInputModel) {
    const responce = await postsMongoDbRepository.updatePost(id, data);
    return responce.matchedCount > 0;
  },
  async deletePost(id: string) {
    const info = await postsMongoDbRepository.deletePost(id);
    return info.deletedCount > 0;
  },
};

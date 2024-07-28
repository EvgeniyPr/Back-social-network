import { ObjectId } from "mongodb";
import { postCollection } from "../db/mongo-db";
import {
  PostOutputModelToFront,
  PostsOutputModelFromDb,
  PostsOutputModelToFrontWithPagination,
} from "../posts/models/PostOutputModel";
import { QueryModel } from "./models/QueryModel";
import { getItemsWithPagination } from "./utils/getItemsWithPagination";
import { sanitizedQuery } from "./utils/sanitizedQuery";

export const queryPostsRepository = {
  async getPosts(blogId: string | null, query: QueryModel) {
    return (await getItemsWithPagination(
      blogId,
      sanitizedQuery(query, "title"),
      postCollection
    )) as PostsOutputModelToFrontWithPagination;
  },
  async getPost(id: string): Promise<PostOutputModelToFront | null> {
    const post = (await postCollection.findOne({
      _id: new ObjectId(id),
    })) as PostsOutputModelFromDb;
    if (post) {
      const { _id, ...rest } = post;
      return { id: _id.toString(), ...rest };
    }
    return null;
  },
};

import { ObjectId } from "mongodb";
import { postCollection } from "../../db/mongo-db";
import {
  PostOutputModelToFront,
  PostsOutputModelFromDb,
  PostsOutputModelToFrontWithPagination,
} from "../models/PostOutputModel";
import { QueryModel, searchBy } from "../../common/models/QueryModels";
import { sanitizedQuery } from "../../common/pagination/sanitizedQuery";
import { getItemsWithPagination } from "../../common/pagination/getItemsWithPagination";

export const queryPostsRepository = {
  async getPosts(blogId: string | null, query: QueryModel) {
    return (await getItemsWithPagination(
      blogId,
      sanitizedQuery(query, searchBy.title),
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
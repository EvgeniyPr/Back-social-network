import { postCollection } from "../db/mongo-db";
import { PostsOutputModelToFrontWithPagination } from "../posts/models/PostOutputModel";
import { QueryModel } from "./QueryModel";
import { getItemsWithPagination } from "./utils/getItemsWithPagination";
import { sanitizedQuery } from "./utils/sanitizedQuery";

export const queryPostsRepository = {
  async getPosts(id: string | null, query: QueryModel) {
    return (await getItemsWithPagination(
      id,
      sanitizedQuery(query, "title"),
      postCollection
    )) as PostsOutputModelToFrontWithPagination;
  },
};

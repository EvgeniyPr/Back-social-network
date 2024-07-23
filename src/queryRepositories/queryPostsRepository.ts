import { postCollection } from "../db/mongo-db";
import { PostsOutputModelToFrontWithPagination } from "../posts/models/PostOutputModel";
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
};

import { BlogsOutputModelToFrontWithPagination } from "../blogs/models/BlogOutputModel";
import { blogCollection } from "../db/mongo-db";
import { QueryModel } from "./models/QueryModel";
import { sanitizedQuery } from "./utils/sanitizedQuery";
import { getItemsWithPagination } from "./utils/getItemsWithPagination";

export const queryBlogsRepository = {
  async getBlogs(query: QueryModel) {
    return (await getItemsWithPagination(
      null,
      sanitizedQuery(query, "name"),
      blogCollection
    )) as BlogsOutputModelToFrontWithPagination;
  },
};

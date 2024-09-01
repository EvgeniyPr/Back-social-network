import { BlogOutputModelToFront } from "../models/BlogOutputModel";
import { blogCollection } from "../../db/mongo-db";
import { QueryModel } from "../../common/models/QueryModels";
import { getItemsWithPagination } from "../../common/pagination/getItemsWithPagination";
import { sanitizedQuery } from "../../common/pagination/sanitizedQuery";
import { IPagination, searchBy } from "../../common/models/Pagination";

export const queryBlogsRepository = {
  async getBlogs(query: QueryModel) {
    return (await getItemsWithPagination(
      null,
      sanitizedQuery(query, searchBy.name),
      blogCollection
    )) as IPagination<BlogOutputModelToFront[]>;
  },
};

import {
  BlogOutputModelToFront,
  BlogsOutputModelFromDb,
  BlogsOutputModelToFrontWithPagination,
} from "../blogs/models/BlogOutputModel";
import { blogCollection } from "../db/mongo-db";
import { QueryModel, searchBy } from "./models/QueryModels";
import { sanitizedQuery } from "./utils/sanitizedQuery";
import { getItemsWithPagination } from "./utils/getItemsWithPagination";
import { ObjectId } from "mongodb";

export const queryBlogsRepository = {
  async getBlogs(query: QueryModel) {
    return (await getItemsWithPagination(
      null,
      sanitizedQuery(query, searchBy.name),
      blogCollection
    )) as BlogsOutputModelToFrontWithPagination;
  },
  async getBlog(id: string): Promise<BlogOutputModelToFront | null> {
    const blog = (await blogCollection.findOne({
      _id: new ObjectId(id),
    })) as BlogsOutputModelFromDb;
    if (blog) {
      const { _id, ...rest } = blog;
      return { id: _id.toString(), ...rest };
    }
    return null;
  },
};

import {
  BlogOutputModelToFront,
  BlogsOutputModelFromDb,
  BlogsOutputModelToFrontWithPagination,
} from "../models/BlogOutputModel";
import { blogCollection } from "../../db/mongo-db";
import { QueryModel, searchBy } from "../../common/models/QueryModels";
import { ObjectId } from "mongodb";
import { getItemsWithPagination } from "../../common/pagination/getItemsWithPagination";
import { sanitizedQuery } from "../../common/pagination/sanitizedQuery";

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

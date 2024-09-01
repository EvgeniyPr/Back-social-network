import { postCollection } from "../../db/mongo-db";
import { PostOutputModelToFront } from "../models/PostOutputModel";
import { QueryModel } from "../../common/models/QueryModels";
import { sanitizedQuery } from "../../common/pagination/sanitizedQuery";
import { getItemsWithPagination } from "../../common/pagination/getItemsWithPagination";
import { IPagination, searchBy } from "../../common/models/Pagination";

export const queryPostsRepository = {
  async getPosts(
    objectId: { id: string; typeId: string } | null,
    query: QueryModel
  ) {
    return (await getItemsWithPagination(
      objectId,
      sanitizedQuery(query, searchBy.title),
      postCollection
    )) as IPagination<PostOutputModelToFront[]>;
  },
};

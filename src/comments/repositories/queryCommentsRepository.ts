import { ObjectId } from "mongodb";
import { commentsCollection } from "../../db/mongo-db";
import { QueryModel } from "../../common/models/QueryModels";
import { getItemsWithPagination } from "../../common/pagination/getItemsWithPagination";
import { sanitizedQuery } from "../../common/pagination/sanitizedQuery";
import { IPagination } from "../../common/models/Pagination";
import { CommentOutputModelToFront } from "../models/CommenOutputModel";
export const queryCommentsRepository = {
  async getComment(id: string) {
    const comment = await commentsCollection.findOne(
      {
        _id: new ObjectId(id),
      },
      { projection: { postId: 0 } }
    );

    if (comment) {
      const { _id, ...rest } = comment;
      return { id: _id.toString(), ...rest };
    }
    return null;
  },
  async getCommentsForSpecifiedPostWithPagination(
    objectId: { id: string; typeId: string } | null,
    query: QueryModel
  ) {
    const commentsWithPagination = (await getItemsWithPagination(
      objectId,
      sanitizedQuery(query, ""),
      commentsCollection
    )) as IPagination<CommentOutputModelToFront[]>;
    return commentsWithPagination;
  },
};

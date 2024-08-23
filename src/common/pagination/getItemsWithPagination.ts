import { Collection } from "mongodb";
import {
  PaginationFilter,
  SanitizedQueryModel,
} from "../../common/models/QueryModels";
import { BlogsOutputModelFromDb } from "../../blogs/models/BlogOutputModel";
import { PostsOutputModelFromDb } from "../../posts/models/PostOutputModel";
import { UsersOutputModelFromDb } from "../../users/models/UserModels";
import { mapId } from "../../common/utils/mapId";
import { CommentOutputModelFromDb } from "../../comments/models/CommenOutputModel";

export const getItemsWithPagination = async (
  objectId: { id: string; typeId: string } | null,
  query: SanitizedQueryModel,
  collection: Collection
) => {
  const filter: PaginationFilter = query.searchNameTerm;
  if (objectId !== null) {
    filter[objectId.typeId] = objectId.id;
  }

  const totalCount = await collection.countDocuments(filter);
  const items = (await collection
    .find(filter, { projection: { password: 0, postId: 0 } })
    .sort(query.sort)
    .skip(query.skipPage)
    .limit(query.pageSize)
    .toArray()) as
    | BlogsOutputModelFromDb[]
    | PostsOutputModelFromDb[]
    | UsersOutputModelFromDb[]
    | CommentOutputModelFromDb[];

  const responce = {
    pagesCount: Math.ceil(totalCount / query.pageSize),
    page: query.pageNumber,
    pageSize: query.pageSize,
    totalCount,
    items: mapId(items),
  };
  return responce;
};

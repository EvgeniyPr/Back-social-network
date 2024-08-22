import { Collection } from "mongodb";
import { sanitizedQueryModel } from "../../common/models/QueryModels";
import { BlogsOutputModelFromDb } from "../../blogs/models/BlogOutputModel";
import { PostsOutputModelFromDb } from "../../posts/models/PostOutputModel";
import { UsersOutputModelFromDb } from "../../users/models/UserModels";
import { mapId } from "../../common/utils/mapId";

export const getItemsWithPagination = async (
  objectId: { id: string; typeId: string } | null,
  query: sanitizedQueryModel,
  collection: Collection
) => {
  const filter = query.searchNameTerm;
  if (objectId !== null) {
    //@ts-ignore
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
    | UsersOutputModelFromDb[];
  const responce = {
    pagesCount: Math.ceil(totalCount / query.pageSize),
    page: query.pageNumber,
    pageSize: query.pageSize,
    totalCount,
    items: mapId(items),
  };
  return responce;
};

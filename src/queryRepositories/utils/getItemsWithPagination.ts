import { Collection } from "mongodb";
import { sanitizedQueryModel } from "../models/QueryModels";
import { BlogsOutputModelFromDb } from "../../blogs/models/BlogOutputModel";
import { PostsOutputModelFromDb } from "../../posts/models/PostOutputModel";
import { UsersOutputModelFromDb } from "../../users/models/UserModels";
import { mapId } from "../../common/utils/mapId";

export const getItemsWithPagination = async (
  blogId: string | null,
  { searchNameTerm, pageSize, pageNumber, sort, skipPage }: sanitizedQueryModel,
  collection: Collection
) => {
  const filter =
    blogId !== null ? { blogId, ...searchNameTerm } : { ...searchNameTerm };
  const totalCount = await collection.countDocuments(filter);
  const pagesCount = Math.ceil(totalCount / pageSize);
  const items = (await collection
    .find(filter, { projection: { password: 0 } })
    .sort(sort)
    .skip(skipPage)
    .limit(pageSize)
    .toArray()) as
    | BlogsOutputModelFromDb[]
    | PostsOutputModelFromDb[]
    | UsersOutputModelFromDb[];
  const responce = {
    pagesCount,
    page: pageNumber,
    pageSize,
    totalCount,
    items: mapId(items),
  };
  return responce;
};

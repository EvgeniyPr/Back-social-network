import { Collection } from "mongodb";
import { sanitizedQueryModel } from "../QueryModel";
import { BlogsOutputModelFromDb } from "../../blogs/models/BlogOutputModel";
import { mapId } from "../../utils/mapId";

export const getItemsWithPagination = async (
  id: string | null,
  { searchNameTerm, pageSize, pageNumber, sort, skipPage }: sanitizedQueryModel,
  collection: Collection
) => {
  const filter =
    id !== null ? { blogId: id, ...searchNameTerm } : { ...searchNameTerm };
  const totalCount = await collection.countDocuments(filter);
  const pagesCount = Math.ceil(totalCount / pageSize);
  const blogs = (await collection
    .find(filter)
    .sort(sort)
    .skip(skipPage)
    .limit(pageSize)
    .toArray()) as BlogsOutputModelFromDb[];
  const responce = {
    pagesCount,
    page: pageNumber,
    pageSize,
    totalCount,
    items: mapId(blogs),
  };
  return responce;
};

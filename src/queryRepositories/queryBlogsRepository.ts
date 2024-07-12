import { BlogsOutputModelFromDb } from "../blogs/models/BlogOutputModel";
import { blogCollection } from "../db/mongo-db";
import { QueryBlogModel, SortDirection } from "./QueryModel";

const sanitizeQuery = (query: QueryBlogModel) => {
  return {
    pageNumber: query.pageNumber ? +query?.pageNumber : 1,
    pageSize: query?.pageSize ? +query?.pageSize : 10,
    sortBy: query?.sortBy ? query?.sortBy : "createdAt",
    sortDirection: query?.sortDirection
      ? query.sortDirection
      : SortDirection.desc,
    searchNameTerm: query?.searchNameTerm ? query.searchNameTerm : null,
  };
};

export const queryBlogsRepository = {
  async getBlogs(query: QueryBlogModel) {
    const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } =
      sanitizeQuery(query);
    const searchBlogByName = searchNameTerm
      ? { name: { $regex: searchNameTerm, $options: "i" } }
      : {};
    const skipPage = (pageNumber - 1) * pageSize;
    const sort = { [sortBy]: sortDirection };
    const totalCount = await blogCollection.countDocuments(searchBlogByName);
    const pagesCount = Math.ceil(totalCount / pageSize);

    const blogs = (await blogCollection
      .find(searchBlogByName)
      .sort(sort)
      .skip(skipPage)
      .limit(pageSize)
      .toArray()) as BlogsOutputModelFromDb[];

    const mapedBlogs = blogs.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));
    return {
      pagesCount,
      page: pageNumber,
      pageSize,
      totalCount,
      items: mapedBlogs,
    };
  },
};

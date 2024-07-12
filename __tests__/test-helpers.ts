import { app } from "../src/app";
import { agent, Response } from "supertest";
import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server-global-4.4";
import { connectToDb } from "../src/db/mongo-db";
import { BlogOutputModelToFront } from "../src/blogs/models/BlogOutputModel";
import { PostsOutputModelToFrontWithPagination } from "../src/posts/models/PostOutputModel";

export const req = agent(app);

let con: MongoClient | false;
export const getUrl = async () => {
  const mongoServe = await MongoMemoryServer.create();
  return mongoServe.getUri();
};

export function responceIsEqualToBlogsData(
  responce: Response,
  {
    pageCount,
    page,
    pageSize,
    totalCount,
    items,
  }: PostsOutputModelToFrontWithPagination
) {
  expect(responce.body).toEqual({
    pagesCount: pageCount,
    page: page,
    pageSize: pageSize,
    totalCount: totalCount,
    items: items,
  });
}

// export function () {
//   blogsData = createRequest.body;

//     expect(blogsData.items.length === 1); }

beforeAll(async () => {
  const uri = await getUrl();
  con = await connectToDb(uri);
  if (!con) {
    throw new Error("Failed to connect to database");
  }
});

afterAll(async () => {
  if (con) {
    await con.close();
  }
});

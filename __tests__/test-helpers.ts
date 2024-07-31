import { app } from "../src/app";
import { agent, Response } from "supertest";
import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server-global-4.4";
import { connectToDb } from "../src/db/mongo-db";
import { BlogsOutputModelToFrontWithPagination } from "../src/blogs/models/BlogOutputModel";
import { PostsOutputModelToFrontWithPagination } from "../src/posts/models/PostOutputModel";
import { UsersOutputModelToFrontWithPagination } from "../src/users/models/UserModels";

export const req = agent(app);

let con: MongoClient | false;
export const getUrl = async () => {
  const mongoServe = await MongoMemoryServer.create();
  return mongoServe.getUri();
};

export function responceIsEqualToData(
  responce: Response,
  {
    pagesCount,
    page,
    pageSize,
    totalCount,
    items,
  }:
    | PostsOutputModelToFrontWithPagination
    | BlogsOutputModelToFrontWithPagination
    | UsersOutputModelToFrontWithPagination
) {
  expect(responce.body).toEqual({
    pagesCount: pagesCount,
    page: page,
    pageSize: pageSize,
    totalCount: totalCount,
    items: items,
  });
}

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

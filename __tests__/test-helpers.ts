import { app } from "../src/app";
import { agent, Response } from "supertest";
import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server-global-4.4";
import { connectToDb } from "../src/db/mongo-db";
import { BlogOutputModelToFront } from "../src/blogs/models/BlogOutputModel";
import { PostOutputModelToFront } from "../src/posts/models/PostOutputModel";
import { UserOutputModelToFront } from "../src/users/models/UserModels";
import { IPagination } from "../src/common/models/Pagination";

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
  }: IPagination<
    | BlogOutputModelToFront[]
    | PostOutputModelToFront[]
    | UserOutputModelToFront[]
  >
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

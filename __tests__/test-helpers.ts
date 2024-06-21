import { app } from "../src/app";
import { agent } from "supertest";
import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server-global-4.4";
import { connectToDb } from "../src/db/mongo-db";
export const req = agent(app);

let con: MongoClient | false;
export const getUrl = async () => {
  const mongoServe = await MongoMemoryServer.create();
  return mongoServe.getUri();
};

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

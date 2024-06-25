import { MongoMemoryServer } from "mongodb-memory-server-global-4.4";

export const getUrl = async () => {
  const mongoServe = await MongoMemoryServer.create();
  return mongoServe.getUri();
};

import { Collection, Db, MongoClient } from "mongodb";
import { SETTINGS } from "../settings/settings";
if (!SETTINGS.MONGO_URI) {
  throw new Error("Missing MONGO_URL in environment variables");
}
export let dbMongo: Db = {} as Db;
export let blogCollection: Collection;
export let postCollection: Collection;
export const connectToDb = async (url: string) => {
  const client = new MongoClient(url);
  try {
    dbMongo = client.db(SETTINGS.DBNAME);
    await client.connect();
    blogCollection = dbMongo.collection(SETTINGS.BLOGS_COLLECTION_NAME);
    postCollection = dbMongo.collection(SETTINGS.POSTS_COLLECTION_NAME);
    return client;
  } catch (e) {
    console.log(e);
    await client.close();
    return false;
  }
};

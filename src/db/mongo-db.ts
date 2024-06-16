import { Collection, Db, MongoClient } from "mongodb";
import { SETTINGS } from "../settings/SETTINGS";

if (!SETTINGS.MONGO_URI) {
  throw new Error("Missing MONGO_URL in environment variables");
}
export let dbMongo: Db = {} as Db;
export let blogCollection: Collection;
export let postCollection: Collection;

const client = new MongoClient(SETTINGS.MONGO_URI);
export const connectToDb = async () => {
  try {
    dbMongo = client.db(SETTINGS.DBNAME);
    await client.connect();
    blogCollection = dbMongo.collection(SETTINGS.BLOGS_COLLECTION_NAME);
    postCollection = dbMongo.collection(SETTINGS.POSTS_COLLECTION_NAME);
    return true;
  } catch (e) {
    console.log(e);
    await client.close();
    return false;
  }
};

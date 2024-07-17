import * as dotenv from "dotenv";
dotenv.config();
export const SETTINGS = {
  PORT: process.env.PORT || 3000,
  PASS: { VIDEO: "/videos", BLOGS: "/blogs", POSTS: "/posts" },
  ADMIN_AUTH: "admin:qwerty",
  DBNAME: "SocialNetwork",
  POSTS_COLLECTION_NAME: "posts",
  BLOGS_COLLECTION_NAME: "blogs",
  MONGO_URI: process.env.MONGO_URL,
  MONGO_DOKER_URI: "mongodb://localhost:27017",
};

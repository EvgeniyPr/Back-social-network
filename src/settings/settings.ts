import * as dotenv from "dotenv";
dotenv.config();
export const SETTINGS = {
  PORT: process.env.PORT || 3000,
  SECRET_KEY: process.env.SECRET_KEY,
  EMAIL: process.env.EMAIL,
  EMAIL_PASS: process.env.EMAIL_PASS,
  PASS: {
    VIDEO: "/videos",
    BLOGS: "/blogs",
    POSTS: "/posts",
    USERS: "/users",
    AUTH: "/auth",
    COMMENTS: "/comments",
  },
  ADMIN_AUTH: "admin:qwerty",
  DBNAME: "SocialNetwork",
  POSTS_COLLECTION_NAME: "posts",
  BLOGS_COLLECTION_NAME: "blogs",
  USERS_COLLECTION_NAME: "users",
  COMMENTS_COLLECTION_NAME: "comments",
  MONGO_URI: process.env.MONGO_URL,
  MONGO_DOKER_URI: "mongodb://localhost:27017",
};

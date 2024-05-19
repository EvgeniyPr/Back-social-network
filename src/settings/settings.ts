import * as dotenv from "dotenv";
dotenv.config();
export const SETTINGS = {
  PORT: process.env.PORT || 3004,
  PASS: { VIDEO: "/videos", BLOGS: "/blogs", POSTS: "/posts" },
  ADMIN_AUTH: "admin:qwerty",
};

import { Router } from "express";
import { getPostsController } from "../posts/controllers/getPostController";
import { createPostsController } from "../posts/controllers/createPostsController";
import { deletePostController } from "../posts/controllers/deletePostController";
import { updatePostController } from "../posts/controllers/updatePostController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const postsRouter = Router();

postsRouter.get("/", getPostsController);
postsRouter.get("/:id", getPostsController);
postsRouter.post("/", authMiddleware, createPostsController);
postsRouter.delete("/:id", authMiddleware, deletePostController);
postsRouter.put("/:id", authMiddleware, updatePostController);

import { Router } from "express";
import { getPostsController } from "../posts/controllers/getPostController";

import { createPostsController } from "../posts/controllers/createPostsController";
import { deletePostController } from "../posts/controllers/deletePostController";
import { updatePostController } from "../posts/controllers/updatePostController";

export const postsRouter = Router();

postsRouter.get("/", getPostsController);
postsRouter.get("/:id", getPostsController);
postsRouter.post("/", createPostsController);
postsRouter.delete("/:id", deletePostController);
postsRouter.put("/:id", updatePostController);

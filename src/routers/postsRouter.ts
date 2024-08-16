import { Router } from "express";
import { createPostsController } from "../posts/controllers/createPostsController";
import { deletePostController } from "../posts/controllers/deletePostController";
import { updatePostController } from "../posts/controllers/updatePostController";
import { authMiddleware } from "../common/middlewares/authMiddleware";
import { errorCheckMiddleware } from "../common/middlewares/errorCheckMiddleware";
import {
  postInputValidator,
  postsIdParamsValidator,
} from "../posts/middleware/postsValidationMiddleware";
import { getPostsController } from "../posts/controllers/getPostsController";
import { getPostController } from "../posts/controllers/getPostController";
import { createCommentForSpecificPost } from "../posts/controllers/createCommentForSpecificPost";
import { commentsValidationMiddleware } from "../comments/middlewares/commentsValidationMiddleware";
import { bearerAuthMiddleware } from "../common/middlewares/bearerAuthMiddleware";

export const postsRouter = Router();
postsRouter.get("/", getPostsController);
postsRouter.get(
  "/:id",
  postsIdParamsValidator,
  errorCheckMiddleware,
  getPostController
);
postsRouter.post(
  "/",
  authMiddleware,
  ...postInputValidator,
  createPostsController
);
postsRouter.delete(
  "/:id",
  authMiddleware,
  postsIdParamsValidator,
  errorCheckMiddleware,
  deletePostController
);
postsRouter.put(
  "/:id",
  authMiddleware,
  postsIdParamsValidator,
  ...postInputValidator,
  updatePostController
);

postsRouter.post(
  "/:id/comments",
  postsIdParamsValidator,
  commentsValidationMiddleware,
  errorCheckMiddleware,
  bearerAuthMiddleware,
  //@ts-ignore
  createCommentForSpecificPost
);

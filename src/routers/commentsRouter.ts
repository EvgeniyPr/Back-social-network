import { Router } from "express";

import {
  commentsIdParamsValidator,
  commentsValidationMiddleware,
} from "../comments/middlewares/commentsValidationMiddleware";
import { errorCheckMiddleware } from "../common/middlewares/errorCheckMiddleware";
import { deleteCommentController } from "../comments/controllers/deleteCommentController";
import { getCommentByIdController } from "../comments/controllers/getCommentByIdController";
import { bearerAuthMiddleware } from "../common/middlewares/bearerAuthMiddleware";
import { updateCommentController } from "../comments/controllers/updateCommentController";

export const commentsRouter = Router();
commentsRouter.get(
  "/:commentId",
  commentsIdParamsValidator,
  errorCheckMiddleware,
  getCommentByIdController
);
commentsRouter.delete(
  "/:commentId",
  bearerAuthMiddleware,
  commentsIdParamsValidator,
  errorCheckMiddleware,
  deleteCommentController
);
commentsRouter.put(
  "/:commentId",
  bearerAuthMiddleware,
  commentsIdParamsValidator,
  commentsValidationMiddleware,
  errorCheckMiddleware,
  updateCommentController
);

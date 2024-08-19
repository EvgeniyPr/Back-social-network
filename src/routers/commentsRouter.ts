import { Router } from "express";

import { commentsIdParamsValidator } from "../comments/middlewares/commentsValidationMiddleware";
import { errorCheckMiddleware } from "../common/middlewares/errorCheckMiddleware";
import { deleteCommentController } from "../comments/controllers/deleteCommentController";
import { getCommentByIdController } from "../comments/controllers/getCommentByIdController";
import { bearerAuthMiddleware } from "../common/middlewares/bearerAuthMiddleware";

export const commentsRouter = Router();
commentsRouter.get(
  "/:commentsId",
  commentsIdParamsValidator,
  errorCheckMiddleware,
  getCommentByIdController
);
commentsRouter.delete(
  "/:commentsId",
  commentsIdParamsValidator,
  errorCheckMiddleware,
  bearerAuthMiddleware,
  deleteCommentController
);

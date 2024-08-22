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
  "/:commentsId",
  commentsIdParamsValidator,
  errorCheckMiddleware,
  getCommentByIdController
);
commentsRouter.delete(
  "/:commentsId",
  bearerAuthMiddleware,
  commentsIdParamsValidator,
  errorCheckMiddleware,
  deleteCommentController
);
commentsRouter.put(
  "/:commentsId",
  bearerAuthMiddleware,
  commentsIdParamsValidator,
  commentsValidationMiddleware,
  errorCheckMiddleware,
  updateCommentController
);

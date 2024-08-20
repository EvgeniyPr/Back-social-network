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
  commentsIdParamsValidator,
  errorCheckMiddleware,
  bearerAuthMiddleware,
  deleteCommentController
);
commentsRouter.put(
  "/:commentsId",
  commentsIdParamsValidator,
  commentsValidationMiddleware,
  errorCheckMiddleware,
  bearerAuthMiddleware,
  updateCommentController
);

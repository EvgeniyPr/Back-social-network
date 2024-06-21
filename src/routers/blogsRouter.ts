import { Router } from "express";
import { getBlogController } from "../blogs/controllers/getBlogController";
import { createBlogController } from "../blogs/controllers/createBlogController";
import { deleteBlogController } from "../blogs/controllers/deleteBlogController";
import { updateBlogController } from "../blogs/controllers/updateBlogController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  blogIdParamsValidator,
  blogsInputValidators,
} from "../blogs/middleware/blogsValidationMiddleware";
import { errorCheckMiddleware } from "../middlewares/errorCheckMiddleware";

export const blogsRouter = Router();

blogsRouter.get("/", getBlogController);
blogsRouter.get(
  "/:id",
  blogIdParamsValidator,
  errorCheckMiddleware,
  getBlogController
);
blogsRouter.post(
  "/",
  authMiddleware,
  ...blogsInputValidators,
  createBlogController
);
blogsRouter.delete(
  "/:id",
  authMiddleware,
  blogIdParamsValidator,
  errorCheckMiddleware,
  deleteBlogController
);

blogsRouter.put(
  "/:id",
  authMiddleware,
  blogIdParamsValidator,
  ...blogsInputValidators,
  updateBlogController
);

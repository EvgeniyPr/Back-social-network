import { Router } from "express";
import { getBlogController } from "../blogs/controllers/getBlogController";
import { createBlogController } from "../blogs/controllers/createBlogController";
import { deleteBlogController } from "../blogs/controllers/deleteBlogController";
import { updateBlogController } from "../blogs/controllers/updateBlogController";
import { authMiddleware } from "../common/middlewares/authMiddleware";
import {
  blogIdParamsValidator,
  blogsInputValidators,
} from "../blogs/middleware/blogsValidationMiddleware";
import { errorCheckMiddleware } from "../common/middlewares/errorCheckMiddleware";
import { getAllPostsByBlogId } from "../posts/controllers/getAllPostsByBlogId";
import { createPostForSpecificBlogContriller } from "../posts/controllers/createPostForSpecificBlogContriller";
import {
  postContentInputValidator,
  postShortDescriptionInputValidator,
  postTitleInputValidator,
} from "../posts/middleware/postsValidationMiddleware";
import { getBlogsController } from "../blogs/controllers/getBlogsController";

export const blogsRouter = Router();
blogsRouter.get("/", getBlogsController);
blogsRouter.get(
  "/:id",
  blogIdParamsValidator,
  errorCheckMiddleware,
  getBlogController
);

blogsRouter.get(
  "/:id/posts",
  blogIdParamsValidator,
  errorCheckMiddleware,
  getAllPostsByBlogId
);

blogsRouter.post(
  "/",
  authMiddleware,
  ...blogsInputValidators,
  createBlogController
);

blogsRouter.post(
  "/:id/posts",
  authMiddleware,
  blogIdParamsValidator,
  postTitleInputValidator,
  postShortDescriptionInputValidator,
  postContentInputValidator,
  errorCheckMiddleware,
  createPostForSpecificBlogContriller
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

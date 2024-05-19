import { Router } from "express";
import { getBlogsController } from "../blogs/controllers/getBlogsController";
import { createBlogController } from "../blogs/controllers/createBlogController";
import { deleteBlogController } from "../blogs/controllers/deleteBlogController";

import { updateBlogController } from "../blogs/controllers/updateBlogController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const blogsRouter = Router();

blogsRouter.get("/", getBlogsController);
blogsRouter.get("/:id", getBlogsController);
blogsRouter.post(
  "/",
  authMiddleware,
  //add middleware validation add error 400
  createBlogController
);
blogsRouter.delete(
  "/:id",
  authMiddleware,
  //add middleware validation
  deleteBlogController
);
blogsRouter.put(
  "/:id",
  authMiddleware,
  //add middleware validation add error 400
  updateBlogController
);

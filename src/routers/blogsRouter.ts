import { Router } from "express";
import { getBlogsController } from "../blogs/controllers/getBlogsController";
import { createBlogController } from "../blogs/controllers/createBlogController";
import { deleteBlogController } from "../blogs/controllers/deleteBlogController";

import { updateBlogController } from "../blogs/controllers/updateBlogController";

export const blogsRouter = Router();

blogsRouter.get("/", getBlogsController);
blogsRouter.get("/:id", getBlogsController);
blogsRouter.post(
  "/",
  //add middleware validation add error 400
  //add middleware auth add error 401
  createBlogController
);
blogsRouter.delete(
  "/:id",
  //add middleware validation
  //add middleware auth add error 401
  deleteBlogController
);
blogsRouter.put(
  "/:id",
  //add middleware validation add error 400
  //add middleware auth add error 401
  updateBlogController
);

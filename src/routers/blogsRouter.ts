import { Router } from "express";
import { getBlogsController } from "../blogs/controllers/getBlogsController";
import { createBlogController } from "../blogs/controllers/createBlogController";
import { deleteBlogController } from "../blogs/controllers/deleteBlogController";
import { updateBlogController } from "../blogs/controllers/updateBlogController";

export const postsRouter = Router();

postsRouter.get("/", getBlogsController);
postsRouter.get("/:id", getBlogsController);
postsRouter.post(
  "/",
  //add middleware validation add error 400
  //add middleware auth add error 401
  createBlogController
);
postsRouter.delete(
  "/:id",
  //add middleware validation
  //add middleware auth add error 401
  deleteBlogController
);
postsRouter.put(
  "/:id",
  //add middleware validation add error 400
  //add middleware auth add error 401
  updateBlogController
);

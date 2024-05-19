import { Router } from "express";
import { getBlogController } from "../blogs/controllers/getBlogController";
import { createBlogController } from "../blogs/controllers/createBlogController";
import { deleteBlogController } from "../blogs/controllers/deleteBlogController";
import { updateBlogController } from "../blogs/controllers/updateBlogController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { blogsInputValidators } from "../blogs/middleware/blogsValidationMiddleware";

export const blogsRouter = Router();

blogsRouter.get("/", getBlogController);
blogsRouter.get("/:id", getBlogController);
blogsRouter.post(
  "/",

  authMiddleware,
  ...blogsInputValidators,
  createBlogController
);

blogsRouter.delete("/:id", authMiddleware, deleteBlogController);
blogsRouter.put(
  "/:id",
  authMiddleware,
  ...blogsInputValidators,
  updateBlogController
);

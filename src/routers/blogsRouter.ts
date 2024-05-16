import { Router } from "express";
import { getBlogsController } from "../blogs/controllers/getBlogsController";

export const postsRouter = Router();

postsRouter.get("/", getBlogsController);

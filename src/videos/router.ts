import { Router } from "express";
import { getVideoController } from "./getVideoController";
import { createVideoController } from "./createVideoController";

export const videoRouter = Router();
videoRouter.get("/", getVideoController);
videoRouter.get("/:id", getVideoController);
videoRouter.post("/", createVideoController);

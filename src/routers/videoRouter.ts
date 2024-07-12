import { Router } from "express";
import { createVideoController } from "../videos/controllers/createVideoController";
import { updateVideoController } from "../videos/controllers/updateVideoController";
import { deleteVideoController } from "../videos/controllers/deleteVideoController";
import { getVideoController } from "../videos/controllers/getVideoController";

export const videoRouter = Router();
videoRouter.get("/", getVideoController);
videoRouter.get("/:id", getVideoController);
videoRouter.put("/:id", updateVideoController);
videoRouter.delete("/:id", deleteVideoController);
videoRouter.post("/", createVideoController);

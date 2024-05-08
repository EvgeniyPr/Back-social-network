import { Router } from "express";
import { getVideoController } from "./controllers/getVideoController";
import { createVideoController } from "./controllers/createVideoController";
import { updateVideoController } from "./controllers/updateVideoController";

export const videoRouter = Router();
videoRouter.get("/", getVideoController);
videoRouter.get("/:id", getVideoController);
videoRouter.put("/:id", updateVideoController);
videoRouter.post("/", createVideoController);

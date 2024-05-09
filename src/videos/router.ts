import { Router } from "express";
import { getVideoController } from "./controllers/getVideoController";
import { createVideoController } from "./controllers/createVideoController";
import { updateVideoController } from "./controllers/updateVideoController";
import { deleteVideoController } from "./controllers/deleteVideoController";

export const videoRouter = Router();
videoRouter.get("/", getVideoController);
videoRouter.get("/:id", getVideoController);
videoRouter.put("/:id", updateVideoController);
videoRouter.delete("/:id", deleteVideoController);
videoRouter.post("/", createVideoController);

//add test router
//add tests e2e

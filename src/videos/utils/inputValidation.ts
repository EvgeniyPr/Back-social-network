import { createVideoModel } from "../../models/videos-models/CreateVideoModel";
import { UpdateVideoModel } from "../../models/videos-models/UpdateVideoModel";
import { APIErrorResult } from "../../models/videos-models/video-error-models/ErrorCreateVideoType";
import { Resolutions, ResolutionsObj } from "../settings/resolutions";
import { resolutionIsNotValid } from "./resolutionIsNotValid";
import { stringIsNotValid } from "./stringIsNotValid";

export const inputValidation = (video: createVideoModel | UpdateVideoModel) => {
  const errors: APIErrorResult = { errorsMessages: [] };
  if (stringIsNotValid(40, video.title)) {
    errors.errorsMessages.push({
      message: "title is required",
      field: "title",
    });
    // return errors;
  }
  if (stringIsNotValid(20, video.author)) {
    errors.errorsMessages.push({
      message: "author is required",
      field: "author",
    });
    // return errors;
  }
  if (
    video.availableResolutions &&
    resolutionIsNotValid(video.availableResolutions, ResolutionsObj)
  ) {
    errors.errorsMessages.push({
      message: "Not valid resolution",
      field: "availableResolutions",
    });
    console.log();
  }

  return errors;
};

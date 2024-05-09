import { createVideoModel } from "../../models/videos-models/CreateVideoModel";
import { InputVideoModel } from "../../models/videos-models/InputVideoModel";
import { APIErrorResult } from "../../models/videos-models/video-error-models/ErrorCreateVideoType";
import { Resolutions } from "../settings/resolutions";
import { isNotBooleanType } from "./isNotBooleanType";
import { resolutionIsNotValid } from "./resolutionIsNotValid";
import { stringIsNotValid } from "./stringIsNotValid";

export const inputValidation = (video: InputVideoModel) => {
  const errors: APIErrorResult = { errorsMessages: [] };
  if (stringIsNotValid(40, video.title)) {
    errors.errorsMessages.push({
      message: "title is required",
      field: "title",
    });
  }
  if (stringIsNotValid(20, video.author)) {
    errors.errorsMessages.push({
      message: "author is required",
      field: "author",
    });
  }
  if (isNotBooleanType(video.canBeDownloaded)) {
    errors.errorsMessages.push({
      message: "Not valid value",
      field: "canBeDownloaded",
    });
  }
  if (
    video.availableResolutions &&
    resolutionIsNotValid(video.availableResolutions, Resolutions)
  ) {
    errors.errorsMessages.push({
      message: "Not valid resolution",
      field: "availableResolutions",
    });
    console.log();
  }

  return errors;
};

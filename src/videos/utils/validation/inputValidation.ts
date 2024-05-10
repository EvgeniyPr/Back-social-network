import { InputVideoModel } from "../../../models/videos-models/InputVideoModel";
import { APIErrorResult } from "../../../models/videos-models/video-error-models/ErrorCreateVideoType";
import { Resolutions } from "../../settings/resolutions";
import { isNotBooleanType } from "./isNotBooleanType";
import { isNotValidMinAgeRestriction } from "./isNotValidMinAgeRestriction";
import { isNotValidResolution } from "./isNotValidResolution";
import { isNotValidString } from "./isNotValidString";

export const inputValidation = (video: InputVideoModel) => {
  const errors: APIErrorResult = { errorsMessages: [] };
  if (isNotValidString(40, video.title)) {
    errors.errorsMessages.push({
      message: "title is required",
      field: "title",
    });
  }
  if (isNotValidString(20, video.author)) {
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
  if (video.publicationDate && video.publicationDate !== "string") {
    errors.errorsMessages.push({
      message: "Not valid publicationDate",
      field: "publicationDate",
    });
  }
  if (isNotValidMinAgeRestriction(video.minAgeRestriction)) {
    errors.errorsMessages.push({
      message: "Not valid minAgeRestriction",
      field: "minAgeRestriction",
    });
  }
  if (
    video.availableResolutions &&
    isNotValidResolution(video.availableResolutions, Resolutions)
  ) {
    errors.errorsMessages.push({
      message: "Not valid resolution",
      field: "availableResolutions",
    });
  }

  return errors;
};

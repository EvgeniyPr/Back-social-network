import { errors } from "../../errors/errors";
import { UpdateVideoInputModel } from "../models/UpdateVideoInputModel";
import { MAX_STRING_LENGTH } from "../settings/VALID_VIDEO_RESOLUTION";
import { isNotBooleanType } from "./isNotBooleanType";
import { isNotValidMinAgeRestriction } from "./isNotValidMinAgeRestriction";
import { isNotValidResolution } from "./isNotValidResolution";
import { isNotValidString } from "./isNotValidString";

export const inputValidation = (video: UpdateVideoInputModel) => {
  errors.errorsMessages = [];
  if (isNotValidString(MAX_STRING_LENGTH.TITLE, video.title)) {
    errors.errorsMessages.push({
      message: "title is required",
      field: "title",
    });
  }
  if (isNotValidString(MAX_STRING_LENGTH.AUTHOR, video.author)) {
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
  if (video.publicationDate && typeof video.publicationDate !== "string") {
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
    isNotValidResolution(video.availableResolutions)
  ) {
    errors.errorsMessages.push({
      message: "Not valid resolution",
      field: "availableResolutions",
    });
  }

  return errors;
};

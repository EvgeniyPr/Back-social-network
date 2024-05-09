import { createVideoModel } from "../../models/videos-models/CreateVideoModel";

export const createVideo = (video: createVideoModel) => {
  return {
    id: Date.now() + Math.random(),
    title: video.title,
    author: video.author,
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: video.availableResolutions
      ? video.availableResolutions
      : [],
  };
};

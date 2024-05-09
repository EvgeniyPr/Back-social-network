import { createVideoModel } from "../../models/videos-models/CreateVideoModel";

export const createVideo = (video: createVideoModel) => {
  const createAt = new Date();
  const publicationDate = (createAt: Date) =>
    new Date(new Date().setDate(createAt.getDate() + 1)).toISOString();
  return {
    id: Date.now() + Math.random(),
    title: video.title,
    author: video.author,
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: createAt.toISOString(),
    publicationDate: publicationDate(createAt),
    availableResolutions: video.availableResolutions
      ? video.availableResolutions
      : [],
  };
};

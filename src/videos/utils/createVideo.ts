import { CreateVideoInputModel } from "../models/CreateVideoInputModel";

export const createVideo = (video: CreateVideoInputModel) => {
  const createAt = new Date();
  const publicationDate = (createAt: Date) =>
    new Date(new Date().setDate(createAt.getDate() + 1)).toISOString();
  return {
    id: Date.now() + Math.random(),
    title: video.title,
    author: video.author,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: createAt.toISOString(),
    publicationDate: publicationDate(createAt),
    availableResolutions: video.availableResolutions
      ? video.availableResolutions
      : [],
  };
};

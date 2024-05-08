import { db } from "../../db/db";
import { OutputVideoModel } from "../../models/videos-models/OutputVideoModel";

export const findIndexVideoToUpdate = (id: string) => {
  return db.videos.findIndex((v: OutputVideoModel) => v.id === +id);
};

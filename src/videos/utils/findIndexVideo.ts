import { db } from "../../db/db";
import { OutputVideoModel } from "../models/OutputVideoModel";

export const findIndexVideo = (id: string) => {
  return db.videos.findIndex((v: OutputVideoModel) => v.id === parseFloat(id));
};

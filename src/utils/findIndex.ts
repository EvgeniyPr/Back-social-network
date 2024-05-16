import { BlogOutputModel } from "../blogs/models/BlogOutputModel";
import { OutputVideoModel } from "../videos/models/OutputVideoModel";

export const findIndex = (
  id: string,
  db: BlogOutputModel[] | OutputVideoModel[]
) => {
  return db.findIndex((v) => v.id?.toString() === id.toString());
};

import { BlogOutputModel } from "../blogs/models/BlogOutputModel";
import { PostOutputModel } from "../posts/models/PostOutputModel";
import { OutputVideoModel } from "../videos/models/OutputVideoModel";

export const findIndex = (
  id: string,
  db: BlogOutputModel[] | OutputVideoModel[] | PostOutputModel[]
) => {
  return db.findIndex((v) => v.id?.toString() === id.toString());
};

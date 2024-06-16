import { BlogOutputModelToFront } from "../blogs/models/BlogOutputModelToFront";
import { PostOutputModel } from "../posts/models/PostOutputModel";
import { OutputVideoModel } from "../videos/models/OutputVideoModel";

export const findIndex = (
  id: string,
  db: BlogOutputModelToFront[] | OutputVideoModel[] | PostOutputModel[]
) => {
  return db.findIndex((v) => v.id?.toString() === id.toString());
};

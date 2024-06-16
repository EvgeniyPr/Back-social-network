import { BlogOutputModelToFront } from "../blogs/models/BlogOutputModelToFront";
import { PostOutputModelToFront } from "../posts/models/PostOutputModelToFrontToFront";
import { OutputVideoModel } from "../videos/models/OutputVideoModel";

export const findIndex = (
  id: string,
  db: BlogOutputModelToFront[] | OutputVideoModel[] | PostOutputModelToFront[]
) => {
  return db.findIndex((v) => v.id?.toString() === id.toString());
};

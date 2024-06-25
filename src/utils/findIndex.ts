import { BlogOutputModelToFront } from "../blogs/models/BlogOutputModel";
import { PostOutputModelToFront } from "../posts/models/PostOutputModel";

import { OutputVideoModel } from "../videos/models/OutputVideoModel";

export const findIndex = (
  id: string,
  db: BlogOutputModelToFront[] | OutputVideoModel[] | PostOutputModelToFront[]
) => {
  return db.findIndex((v) => v.id?.toString() === id.toString());
};

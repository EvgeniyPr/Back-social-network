import { BlogOutputModelToFront } from "../../blogs/models/BlogOutputModel";
import { PostOutputModelToFront } from "../../posts/models/PostOutputModel";
import { OutputVideoModel } from "../../videos/models/OutputVideoModel";

export const findIndex = (
  id: string,
  data: BlogOutputModelToFront[] | OutputVideoModel[] | PostOutputModelToFront[]
) => {
  return data.findIndex((el) => el.id?.toString() === id.toString());
};

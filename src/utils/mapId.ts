import { BlogsOutputModelFromDb } from "../blogs/models/BlogOutputModel";
import { PostsOutputModelFromDb } from "../posts/models/PostOutputModel";

export const mapId = (
  array: PostsOutputModelFromDb[] | BlogsOutputModelFromDb[]
) => {
  return array.map(({ _id, ...rest }) => ({
    id: _id.toString(),
    ...rest,
  }));
};

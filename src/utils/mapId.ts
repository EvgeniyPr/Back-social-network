import { BlogsOutputModelFromDb } from "../blogs/models/BlogOutputModel";
import { PostsOutputModelFromDb } from "../posts/models/PostOutputModel";
import { UsersOutputModelFromDb } from "../users/models/UserModels";

export const mapId = (
  array:
    | PostsOutputModelFromDb[]
    | BlogsOutputModelFromDb[]
    | UsersOutputModelFromDb[]
) => {
  return array.map(({ _id, ...rest }) => ({
    id: _id.toString(),
    ...rest,
  }));
};

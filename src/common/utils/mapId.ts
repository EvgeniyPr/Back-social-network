import { BlogsOutputModelFromDb } from "../../blogs/models/BlogOutputModel";
import { CommentOutputModelFromDb } from "../../comments/models/CommenOutputModel";
import { PostsOutputModelFromDb } from "../../posts/models/PostOutputModel";
import { UsersOutputModelFromDb } from "../../users/models/UserModels";
export const mapId = (
  array:
    | PostsOutputModelFromDb[]
    | BlogsOutputModelFromDb[]
    | UsersOutputModelFromDb[]
    | CommentOutputModelFromDb[]
) => {
  return array.map(({ _id, ...rest }) => ({
    id: _id.toString(),
    ...rest,
  }));
};

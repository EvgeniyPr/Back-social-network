import { BlogInputModel } from "../models/BlogInputModel";
import { BlogOutputModel } from "../models/BlogOutputModel";

export const createBlog = (data: BlogInputModel): BlogOutputModel => {
  return { ...data, id: (Date.now() + Math.random()).toString() };
};

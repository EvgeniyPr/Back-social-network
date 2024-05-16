import { Response } from "express";
import { db } from "../../db/db";
import { RequestWithParams } from "../../models/RequestsModels";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { BlogOutputModel } from "../models/BlogOutputModel";
import { GetBlogByURIParamsModel } from "../models/GetBlogByURIParamsModel";

export const getBlogsController = (
  req: RequestWithParams<GetBlogByURIParamsModel>,
  res: Response<BlogOutputModel[] | BlogOutputModel>
) => {
  if (!req.params.id) {
    res.status(HTTP_STATUSES.OK_200).json(db.blogs);
    return;
  } else {
    const blog = db.blogs.find((blog) => blog.id === req.params.id);
    if (blog) {
      res.status(HTTP_STATUSES.OK_200).json(blog);
      return;
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  }
};

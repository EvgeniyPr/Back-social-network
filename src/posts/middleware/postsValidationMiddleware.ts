import { body, param } from "express-validator";
import { errorCheckMiddleware } from "../../middlewares/errorCheckMiddleware";
import { blogsMongoDBRepository } from "../../blogs/repositories/blogsMongoDbRepository";
import { blogsService } from "../../blogs/domain/blogsService";

export const postTitleInputValidator = body("title")
  .trim()
  .notEmpty()
  .withMessage("title is empty")
  .isString()
  .withMessage("title must be a string")
  .isLength({ max: 30 })
  .withMessage("max length of title is 30");

export const postShortDescriptionInputValidator = body("shortDescription")
  .trim()
  .notEmpty()
  .withMessage("shortDescription is empty")
  .isString()
  .withMessage("shortDescription must be a string")
  .isLength({ max: 100 })
  .withMessage("max length of shortDescription is 100");
export const postContentInputValidator = body("content")
  .trim()
  .notEmpty()
  .withMessage("content is empty")
  .isString()
  .withMessage("content must be a string")
  .isLength({ max: 1000 })
  .withMessage("max length of content is 1000");

export const postBlogIdInputValidator = body("blogId")
  .trim()
  .notEmpty()
  .withMessage("blogId is empty")
  .isString()
  .withMessage("blogId must be a string")
  .custom(async (id) => {
    await blogsService.blogWithIdIsExist(id);
  });

export const postsIdParamsValidator = param("id")
  .matches(/^[0-9a-fA-F]{24}$/)
  .withMessage("id must be 24 character hex string");

export const postInputValidator = [
  postTitleInputValidator,
  postShortDescriptionInputValidator,
  postContentInputValidator,
  postBlogIdInputValidator,
  errorCheckMiddleware,
];

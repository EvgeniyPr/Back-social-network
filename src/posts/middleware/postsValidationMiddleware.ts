import { body } from "express-validator";
import { errorCheckMiddleware } from "../../middlewares/errorCheckMiddleware";
import { blogsRepository } from "../../blogs/repositories/blogsRepository";

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
  .custom(async (blogId) => {
    await blogsRepository.findBlogNameById(blogId);
  });

export const postInputValidator = [
  postTitleInputValidator,
  postShortDescriptionInputValidator,
  postContentInputValidator,
  postBlogIdInputValidator,
  errorCheckMiddleware,
];

import { body } from "express-validator";
import { errorCheckMiddleware } from "../../middlewares/errorCheckMiddleware";

export const blogNameInputValidator = body("name")
  .trim()
  .notEmpty()
  .withMessage("name is empty")
  .isString()
  .withMessage("name must be a string")
  .isLength({ max: 15 })
  .withMessage("max length of name is 15");

export const blogDescriptionInputValidation = body("description")
  .trim()
  .notEmpty()
  .withMessage("description is empty")
  .isString()
  .withMessage("description must be a string")
  .isLength({ max: 500 })
  .withMessage("max length of description is 500");

export const blogWebsiteUrlInputValidation = body("websiteUrl")
  .trim()
  .notEmpty()
  .withMessage("websiteUrl is empty")
  .isString()
  .withMessage("websiteUrl must be a string")
  .isLength({ max: 100 })
  .withMessage("max length of websiteUrl is 100")
  .matches(
    /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
  )
  .withMessage("format websiteUrl must be data URL");

export const blogsInputValidators = [
  blogNameInputValidator,
  blogDescriptionInputValidation,
  blogWebsiteUrlInputValidation,
  errorCheckMiddleware,
];

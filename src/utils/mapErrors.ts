import { ValidationError } from "express-validator";
import { errors } from "../errors/errors";

export const mapErrors = (errorArray: ValidationError[]) => {
  errors.errorsMessages = errorArray.map((e: any) => {
    return { message: e.msg, field: e.path };
  });
};

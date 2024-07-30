import { ValidationError } from "express-validator";

export const mapErrors = (errorArray: ValidationError[]) => {
  const error = errorArray.map((e: any) => {
    return { message: e.msg, field: e.path };
  });
  return { errorsMessages: error };
};

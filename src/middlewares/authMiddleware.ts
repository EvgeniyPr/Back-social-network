import { NextFunction, Request, Response } from "express";
import { SETTINGS } from "../settings/SETTINGS";
import { HTTP_STATUSES } from "../settings/HTTP_STATUSES/HTTP_STATUSES";
const base64regex: RegExp =
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  if (auth && base64regex.test(auth.slice(6))) {
    const decodedAuth = atob(auth.slice(6));
    if (decodedAuth === SETTINGS.ADMIN_AUTH && auth.slice(0, 5) === "Basic") {
      next();
      return;
    }
  }
  res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
};

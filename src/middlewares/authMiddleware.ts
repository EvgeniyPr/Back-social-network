import { NextFunction, Request, Response } from "express";
import { SETTINGS } from "../settings/settings";
import { HTTP_STATUSES } from "../settings/HTTP_STATUSES/HTTP_STATUSES";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  if (auth) {
    const decodedAuth = atob(auth.slice(6));
    if (decodedAuth === SETTINGS.ADMIN_AUTH && auth.slice(0, 5) === "Basic") {
      next();
      return;
    }
  }
  res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
};

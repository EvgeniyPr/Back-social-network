import { NextFunction, Request, Response } from "express";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { jwtService } from "../../jwt/domain/jwtService";
import { MeViewModel } from "../../auth/models/MeViewModel";

export const bearerAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
    return;
  }
  const token: string = req.headers.authorization!.slice(7);
  const userInfoFromToken: MeViewModel | null =
    jwtService.getUserInfoFromToken(token);
  if (userInfoFromToken) {
    req.user = userInfoFromToken;
  } else {
    res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
    return;
  }
  next();
};

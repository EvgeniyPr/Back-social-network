import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { MeViewModel } from "../models/MeViewModel";
import { jwtService } from "../../jwt/domain/jwtService";

export const getMeController = (req: Request, res: Response) => {
  // const token: string = req.headers.authorization!.slice(7);
  // if (!token) {
  //   res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
  // }
  //@ts-ignore
  const user = req.user;
  console.log(user, "user");
  // const informationFromToken: MeViewModel | null =
  //   jwtService.getUserByToken(token);

  res.status(HTTP_STATUSES.OK_200).json(user);
  return;
};

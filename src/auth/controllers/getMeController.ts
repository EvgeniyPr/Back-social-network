import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";

export const getMeController = (req: Request, res: Response) => {
  res.status(HTTP_STATUSES.OK_200).json(req.user!);
  return;
};

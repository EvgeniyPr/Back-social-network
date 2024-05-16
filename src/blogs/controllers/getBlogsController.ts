import { RequestWithParams } from "../../models/requests-models/RequestsModels";
import { OutputVideoModel } from "../../videos/models/OutputVideoModel";
import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";

export const getBlogsController = (req: any, res: any) => {
  if (!req.body.id) {
    res.status(HTTP_STATUSES.OK_200).json("");
  }
};

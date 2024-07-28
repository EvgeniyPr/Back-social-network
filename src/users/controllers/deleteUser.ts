import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { usersMongoDbRepository } from "../repositories/usersMongoDbRepository";
//@ts-ignore
export const deleteUser = async (req, res) => {
  const info = await usersMongoDbRepository.deleteUser(req.params.id);
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  return;
};

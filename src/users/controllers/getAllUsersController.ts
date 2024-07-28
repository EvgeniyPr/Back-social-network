import { HTTP_STATUSES } from "../../settings/HTTP_STATUSES/HTTP_STATUSES";
import { usersMongoDbRepository } from "../repositories/usersMongoDbRepository";
//@ts-ignore
export const getAllUsersController = async (req, res) => {
  const users = await usersMongoDbRepository.getAllUsers();
  console.log("heris a users", users);
  res.status(HTTP_STATUSES.OK_200).json(users);
  return;
};

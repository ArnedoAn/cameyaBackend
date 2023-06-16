import db_controller from "./db_controller";
import { UserInterface as User } from "../../interfaces/models";

const createUser = db_controller.createUser;
const getAllUsers = db_controller.getAllUsers;
const updateUser = db_controller.updateUser;
const getUserWhere = db_controller.getUserWhere;
const getUsersWhere = db_controller.getUsersWhere;
const updateScoreWorker = db_controller.setScoreUser;
const setScoreUser = db_controller.setScoreUser;

async function getUserByDni(dni: string) {
  const response = await getUserWhere({ dni: dni });
  return response;
}

async function getScoreUser(dni: string) {
  const response = await getUserWhere({ dni: dni });
  return response;
}

async function getUserByEmail(email: string) {
  const response = await getUserWhere({ email: email });
  return response;
}

async function uploadProfilePicture(dni: string, url: string) {
  const response = await updateUser(dni, { profile_picture: url });
  return response;
}

export default {
  createUser,
  getAllUsers,
  updateUser,
  getUserByDni,
  getScoreUser,
  getUserByEmail,
  uploadProfilePicture,
  updateScoreWorker,
  setScoreUser,
};

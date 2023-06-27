import UserController from "../../../data/controllers/database/User.controller";
import { UserInterface } from "../../../data/interfaces/models";
import ImageController from "../../../utils/images/uploadImage.service";

async function getProfileData(email: string) {
  const response = await UserController.getUserByDni(email);
  delete response.message.password;
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message };
}

async function modifyProfileData(user: UserInterface) {
  const response = await UserController.updateUser(user.dni, user);
  delete response.message.password;
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message };
}

async function uploadProfilePicture(image: Express.Multer.File, dni: string) {
  const response = await ImageController.uploadImage(image, dni);
  if (!response.success) return { success: false, message: response.message };

  try {
    const user = await UserController.uploadProfilePicture(
      dni,
      response.message as string
    );

    if (!user.success) throw new Error(user.message);

    return { success: true, message: response.message };
  } catch (err: Error | any) {
    console.log(err);
    return { success: false, message: err.message };
  }
}

async function setScoreUser(id: number, dni: string, score: number) {
  const response = await UserController.setScoreUser(id.toString(), dni, score);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Score assigned successfully" };
}

async function getScoreUser(id: number) {
  const response = await UserController.getScoreUser(id.toString());
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message };
}

async function terminateService(service_id: number) {
  const response = await UserController.terminateService(service_id);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message };
}

export default {
  getProfileData,
  modifyProfileData,
  uploadProfilePicture,
  setScoreUser,
  getScoreUser,
  terminateService
};

import dbController from "../../../data/controllers/db_controller";
import { UserInterface } from "../../../data/interfaces/models";
import ImageController from "../../../utils/images/uploadImage.service";

async function getProfileData(email: string) {
  const response = await dbController.getUserByDni(email);
  delete response.message.password;
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message };
}

async function modifyProfileData(user: UserInterface) {
  const response = await dbController.updateUser(user.dni, user);
  delete response.message.password;
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message };
}

async function uploadProfilePicture(image: Express.Multer.File, dni: string) {
  const response = await ImageController.uploadImage(image, dni);
  if (!response.success) return { success: false, message: response.message };

  try {
    const user = await dbController.uploadProfilePicture(
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

async function setScoreWorker(id: number, score: number) {
  const response = await dbController.updateScoreWorker(id, score);
  const response2 = await dbController.setScoreWorker(id.toString(), score);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Score assigned successfully" };
}

async function getScoreUser(id: number) {
  const response = await dbController.getScoreUser(id.toString());
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message };
}

export default {
  getProfileData,
  modifyProfileData,
  uploadProfilePicture,
  setScoreWorker,
  getScoreUser
};

import dbController from "../../../data/controllers/db_controller";
import { UserInterface } from "../../../data/interfaces/models";
import ImageController from "../../../utils/images/uploadImage.service";

async function getProfileData(email: string) {
  const response = await dbController.getUserByDni(email);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message };
}

async function modifyProfileData(user: UserInterface) {
  const response = await dbController.updateUser(user.email, user);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Data updated successfully" };
}

async function uploadProfilePicture(image: Express.Multer.File, dni: string) {
  const response = await ImageController.uploadImage(image, dni);
  if (!response.success) return { success: false, message: response.message };

  try {
    const user = await dbController.updloadProfilePicture(
      dni,
      response.url as string
    );

    if (!user.success) throw new Error(user.message);

    return { success: true, message: "Profile picture added successfully" };
  } catch (err: Error | any) {
    console.log(err);
    return { success: false, message: err.message };
  }
}

async function setScore(dni: string, score: number) {
  const response = await dbController.updateScoreUser(dni, score);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Score assigned successfully" };
}

export default {
  getProfileData,
  modifyProfileData,
  uploadProfilePicture,
  setScore,
};

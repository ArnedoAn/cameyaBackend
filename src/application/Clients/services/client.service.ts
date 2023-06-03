import dbController from "../../../data/controllers/db_controller";
import { UserInterface } from "../../../data/interfaces/models";
import ImageController from "../../Services/uploadImage.service";

async function getProfileData(email: string) {
  const response = await dbController.getUserByDni(email);
  if (!response.success) {
    return { success: false, message: response.message };
  }
  return { success: true, message: response.message };
}

async function modifyProfileData(user: UserInterface) {
  const response = await dbController.updateUser(user.email, user);
  if (!response.success) {
    return { success: false, message: response.message };
  }
  return { success: true, message: response.message };
}

async function uploadProfilePicture(image: Express.Multer.File) {
  const response = await ImageController.uploadImage(image);
  if (!response.success) {
    return { success: false, message: response.message };
  }
  return { success: true, message: response.message };
}

async function getProfilePicture(imageName: string) {
  const response = await ImageController.getImage(imageName);
  if (!response.success) {
    return { success: false, message: response.message };
  }
  return { success: true, message: response.file };
}

export default { getProfileData, modifyProfileData, uploadProfilePicture, getProfilePicture };

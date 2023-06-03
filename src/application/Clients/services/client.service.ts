import dbController from "../../../data/controllers/db_controller";
import { UserInterface } from "../../../data/interfaces/models";

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

async function uploadProfilePicture(user: UserInterface) {
  const response = await dbController.updateUser(user.email, user.profile_picture);
  if (!response.success) {
    return { success: false, message: response.message };
  }
  return { success: true, message: response.message };
}

export default { getProfileData, modifyProfileData };

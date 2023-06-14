import dbController from "../../../data/controllers/db_controller";
import { WorkerInterface } from "../../../data/interfaces/models";
import ImageController from "../../../utils/images/uploadImage.service";

async function getProfileData(dni: string) {
    const response = await dbController.getWorkerByDni(dni);
    if (!response.success) return { success: false, message: response.message };
    return { success: true, message: response.message };
}

async function modifyProfileData(user: WorkerInterface) {
    const response = await dbController.updateWorker(user.user_dni, user);
    if (!response.success) return { success: false, message: response.message };
    return { success: true, message: "Data updated successfully" };
}

async function setScoreUser(id: number, score: number) {
    const response = await dbController.updateScoreUser(id, score);
    const response2 = await dbController.setScoreUser(id.toString(), score);
    if (!response.success || !response2.success) return { success: false, message: response.message };
    return { success: true, message: "Score assigned successfully" };
}

async function getScoreWorker(id: number) {
    const response = await dbController.getScoreUser(id.toString());
    if (!response.success) return { success: false, message: response.message };
    return { success: true, message: response.message };
}

export default {
    getProfileData,
    modifyProfileData,
    setScoreUser,
    getScoreWorker
}



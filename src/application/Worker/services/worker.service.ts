import WorkerController from "../../../data/controllers/database/Worker.controller";
import { WorkerInterface } from "../../../data/interfaces/models";
import { WorkerPostulations } from "@prisma/client";

async function getProfileData(dni: string) {
  const response = await WorkerController.getWorkerByDni(dni);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message };
}

async function modifyProfileData(user: WorkerInterface) {
  const response = await WorkerController.updateWorker(user.user_dni, user);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Data updated successfully" };
}

async function setScoreWorker(service_id: number, dni: string, score: number) {
  const response = await WorkerController.setScoreWorker(
    service_id.toString(),
    dni,
    score
  );
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Score assigned successfully" };
}

async function getScoreWorker(id: number) {
  const response = await WorkerController.getScoreWorker(id.toString());
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message };
}


async function addWorkerPostulation(
  postulation: WorkerPostulations
) {
  const response = await WorkerController.addWorkerPostulation(
    postulation
  );
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Worker postulation added succesfully" };
}

async function retireFromService(postulation: WorkerPostulations) {
  const response = await WorkerController.retire(postulation);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Worker retired from service succesfully" };
}

export default {
  getProfileData,
  modifyProfileData,
  setScoreWorker,
  getScoreWorker,
  addWorkerPostulation,
  retireFromService
};

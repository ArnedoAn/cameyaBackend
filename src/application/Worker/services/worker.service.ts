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

async function setScoreWorker(id: number, dni: string, score: number) {
  const response = await WorkerController.setScoreWorker(
    id.toString(),
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
  // service_id: number,
  // worker_dni: string
  postulation: WorkerPostulations
) {
  const response = await WorkerController.addWorkerPostulation(
    postulation
  );
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Worker postulation added succesfully" };
}

export default {
  getProfileData,
  modifyProfileData,
  setScoreWorker,
  getScoreWorker,
  addWorkerPostulation
};

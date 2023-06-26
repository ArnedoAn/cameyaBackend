import db_controller from "./db_controller";
import { WorkerPostulations } from "@prisma/client";

const createWorker = db_controller.createWorker;
const getAllWorkers = db_controller.getAllWorkers;
const updateWorker = db_controller.updateWorker;
const getWorkerWhere = db_controller.getWorkerWhere;
const getWorkersWhere = db_controller.getWorkersWhere;
const setScoreWorker = db_controller.setScoreWorker;
const createWorkerPosulation = db_controller.createWorkerPosulation;

async function getWorkerByDni(dni: string) {
  const response = await getWorkerWhere({ dni: dni });
  return response;
}

async function getWorkersByCategory(category: string) {
  const reponse = await getWorkersWhere({ category: category });
  return reponse;
}

async function getScoreWorker(dni: string) {
  const response = await getWorkerWhere({ dni: dni });
  return response;
}

async function addWorkerPostulation(postulation: WorkerPostulations) {
  // const data = service_id, worker_dni;
  const response = await createWorkerPosulation(
    postulation
  );
  return response;
}

export default {
  createWorker,
  getAllWorkers,
  updateWorker,
  getWorkerByDni,
  getWorkersByCategory,
  setScoreWorker,
  getScoreWorker,
  addWorkerPostulation
};

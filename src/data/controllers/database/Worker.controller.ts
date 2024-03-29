import db_controller from "./db_controller";
import { WorkerPostulations } from "@prisma/client";

const createWorker = db_controller.createWorker;
const getAllWorkers = db_controller.getAllWorkers;
const updateWorker = db_controller.updateWorker;
const getWorkerWhere = db_controller.getWorkerWhere;
const getWorkersWhere = db_controller.getWorkersWhere;
const setScoreWorker = db_controller.setScoreWorker;
const createWorkerPosulation = db_controller.createWorkerPosulation;
const retireFromService = db_controller.retireFromService;
const updateService = db_controller.updateService;
const getFinalization = db_controller.getFinalization;

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

async function retire(postulation: WorkerPostulations) {
  const response = await retireFromService(postulation);
  return response;
}

async function terminateService(service_id: number) {
  const response = await updateService(service_id, {approbation_worker: 1});
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
  addWorkerPostulation,
  retire,
  terminateService,
  getFinalization,
  updateService
};

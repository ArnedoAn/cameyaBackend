import db_controller from "./db_controller";

const createWorker = db_controller.createWorker;
const getAllWorkers = db_controller.getAllWorkers;
const updateWorker = db_controller.updateWorker;
const getWorkerWhere = db_controller.getWorkerWhere;
const getWorkersWhere = db_controller.getWorkersWhere;
const setScoreWorker = db_controller.setScoreWorker;

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

export default {
  createWorker,
  getAllWorkers,
  updateWorker,
  getWorkerByDni,
  getWorkersByCategory,
  setScoreWorker,
  getScoreWorker,
};
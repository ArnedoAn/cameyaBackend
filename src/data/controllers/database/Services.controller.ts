import db_controller from "./db_controller";
import { ServiceStatus as Status } from "../../interfaces/models";

const createService = db_controller.createService;
const getAllServices = db_controller.getAllServices;
const getAllServicesWhere = db_controller.getAllServicesWhere;
const updateService = db_controller.updateService;
const getServiceWhere = db_controller.getServiceWhere;
const deleteService = db_controller.deleteService;
const deleteWorkerPosulation = db_controller.deleteWorkerPosulation;

async function addWorkerPostulation(
  id: number,
  worker_postulations: string[],
  worker_dni: string
) {
  const response = await updateService(id, {
    worker_dni: [...worker_postulations, worker_dni],
    service_status: Status["Not Assigned"],
  });
  return response;
}

async function selectServices(id:number, data:any){
  const response = await selectServices(id, {
    id: true,
    service_title: true,
    service_description: true,
    total_price: true,
    date_programmed: true,
  })
}

async function getService(id: number) {
  const response = await getServiceWhere({ id });
  return response;
}

async function getServicesNotAssigned() {
  const response = await getAllServicesWhere({
    service_status: Status["Not Assigned"],
  });
  return response;
}

async function updateServiceNotAssigned(id_service: number, id_worker: number, id: number) {
    await updateService(id_service, { Status: Status["Assigned"], worker_dni: id_worker });
    const response = await deleteWorkerPosulation(id_worker, id_service, id);
    
    return response;
}

async function getServicesOfUser(dni: string) {
  const response = await getAllServicesWhere({ client_dni: dni });
  return response;
}

async function getServicesOfWorker(dni: string) {
  const response = await getAllServicesWhere({ worker_dni: dni });
  return response;
}

async function getServicesByCategory(categories: string[]) {
  const response = await getAllServicesWhere({
    categories: {
      hasSome: categories,
    },
  });
  return response;
}

async function updateScoreWorker(id: number, score: number) {
  const response = await updateService(id, { worker_score: score });
  return response;
}

async function updateScoreUser(id: number, score: number) {
  const response = await updateService(id, {
    client_score: score,
  });
  return response;
}

async function getScoreService(id: number) {
  const response = await getServiceWhere({ id: id });
  if (!response.success) return response;
  const service = response.message;
  const client_score = service?.client_score;
  const worker_score = service?.worker_score;
  return { success: true, message: { client_score, worker_score } };
}

export default {
  createService,
  getServicesOfUser,
  getServicesOfWorker,
  getServicesByCategory,
  updateService,
  getAllServices,
  getServicesNotAssigned,
  updateServiceNotAssigned,
  updateScoreWorker,
  updateScoreUser,
  getScoreService,
  deleteService,
  addWorkerPostulation,
  getService,
};

import dbController from "../../../data/controllers/database/Services.controller";
import { ServiceInterface } from "../../../data/interfaces/models";
import {
  ServiceDTOPOST,
  ServiceDTOUPDATE,
  ServiceDTOGET,
} from "../../../data/interfaces/DTO/service.dto";

async function getAllServices() {
  const response = await dbController.getAllServices();
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message as ServiceDTOGET[] };
}

async function getService(id: string) {
  const response = await dbController.getService(Number(id));
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message as ServiceDTOGET };
}

async function getServicesNotAssigned() {
  const response = await dbController.getServicesNotAssigned();
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message as ServiceDTOGET[] };
}

async function createService(service: ServiceInterface) {
  const response = await dbController.createService(service);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Service created succesfully" };
}

async function getServicesOfUser(id: string) {
  const response = await dbController.getServicesOfUser(id);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message };
}

async function getServicesOfWorker(id: string) {
  const response = await dbController.getServicesOfWorker(id);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message };
}

async function getServicesByCategory(categories: string[]) {
  const response = await dbController.getServicesByCategory(categories);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message };
}

async function updateService(service: ServiceDTOUPDATE) {
  const response = await dbController.updateService(service.id!, service);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Service updated succesfully" };
}

async function deleteService(id: string) {
  const response = await dbController.deleteService(id);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Service deleted succesfully" };
}

async function addWorkerPostulation(
  id: number,
  worker_postulations: string[],
  worker_dni: string
) {
  const response = await dbController.addWorkerPostulation(
    id,
    worker_postulations,
    worker_dni
  );
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Worker postulation added succesfully" };
}

export default {
  createService,
  getServicesOfUser,
  getServicesOfWorker,
  getServicesByCategory,
  updateService,
  deleteService,
  getAllServices,
  getServicesNotAssigned,
  addWorkerPostulation,
  getService,
};

import dbController from "../../../data/controllers/database/Services.controller";
import { ServiceInterface } from "../../../data/interfaces/models";
import {
  ServiceDTOPOST,
  ServiceDTOUPDATE,
  ServiceDTOGET,
} from "../../../data/interfaces/DTO/service.dto";
import { WorkerPostulations } from "@prisma/client";

async function getAllServices(page: number) {
  const response = await dbController.getAllServices(page);
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

async function updateServiceNotAssigned(id_service: number, id_worker: string) {
  const response = await dbController.updateServiceNotAssigned(
    id_service,
    id_worker
  );
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Service updated succesfully" };
}

async function getAllCategories(page: number) {
  const categories = await dbController.getAllCategories(page as number);
  if (categories.success) {
    return { success: true, message: categories.message };
  }
  return { success: false, message: categories.message };
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
  updateServiceNotAssigned,
  getService,
  getAllCategories
};

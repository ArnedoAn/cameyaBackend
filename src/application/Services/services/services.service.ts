import dbController from "../../../data/controllers/database/Services.controller";
import { ServiceInterface } from "../../../data/interfaces/models";
import {
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
  const postulations = await dbController.getAllWorkerPostulations(id);
  const services = await dbController.getServicesOfWorker(id);

  if (
    (!postulations.success && !services.success) ||
    (!postulations.success && services.success) ||
    (postulations.success && !services.success)
  )
    return { success: false, message: postulations.message + services.message };

  const postulationsMessage = postulations.message as WorkerPostulations[];
  const servicesMessage = services.message as ServiceDTOGET[];

  let allServices: ServiceInterface[] = [];

  if (postulationsMessage.length > 0) {
    await Promise.all(
      postulationsMessage.map(async (postulation) => {
        const service = await getService(postulation.service_id.toString());
        allServices.push(service.message as ServiceInterface);
      })
    );
  }

  if (servicesMessage.length > 0) {
    await Promise.all(
      servicesMessage.map(async (postulation) => {
        const service = await getService(postulation.id.toString());
        allServices.push(service.message as ServiceInterface);
      })
    );
  }

  return {
    success: true,
    message: allServices,
  };
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

async function updateServiceNotAssigned(
  worker_dni: string,
  service_id: number
) {
  const response = await dbController.updateServiceNotAssigned(
    worker_dni,
    service_id
  );
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Service updated succesfully" };
}

async function getAllCategories() {
  const response = await dbController.getCategories();
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message };
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
  getAllCategories,
};

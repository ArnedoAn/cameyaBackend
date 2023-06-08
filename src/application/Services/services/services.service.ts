import dbController from "../../../data/controllers/db_controller";
import { ServiceInterface } from "../../../data/interfaces/models";

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

async function getServicesByCategory(category: string) {
  const response = await dbController.getServicesByCategory(category);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: response.message };
}

async function updateService(service: ServiceInterface) {
  const response = await dbController.updateService(service.id, service);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Service updated succesfully" };
}

async function deleteService(id: string) {
  const response = await dbController.deleteService(id);
  if (!response.success) return { success: false, message: response.message };
  return { success: true, message: "Service deleted succesfully" };
}
import { DBconstants as constants } from "../../constants/database";
import {
  UserInterface as User,
  WorkerInterface as Worker,
  ServiceInterface as Service,
} from "../interfaces/models";

const prisma = constants.prisma;

async function createUser(user: User) {
  try {
    const client = await prisma.user.create({
      data: user,
    });
    return { success: true, message: client };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.code };
  }
}

async function createWorker(user: Worker) {
  try {
    const worker = await prisma.worker.create({
      data: user,
    });
    const editUser = await prisma.user.update({
      where: {
        dni: user.user_dni,
      },
      data: {
        is_worker: true,
      },
    });
    return { success: true, message: worker };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function createService(service: Service) {
  try {
    const newService = await prisma.service.create({
      data: service,
    });
    return { success: true, message: newService };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getAllServices() {
  try {
    const services = await prisma.service.findMany();
    return { success: true, message: services };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getAllWorkers() {
  try {
    const workers = await prisma.worker.findMany();
    return { success: true, message: workers };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getAllUsers() {
  try {
    const clients = await prisma.user.findMany();
    return { success: true, message: clients };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getUserByDni(dni: string) {
  try {
    const client = await prisma.user.findUnique({
      where: {
        dni: dni,
      },
    });
    return { success: true, message: client };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getWorkerByDni(dni: string) {
  try {
    const worker = await prisma.worker.findUnique({
      where: {
        user_dni: dni,
      },
    });
    return { success: true, message: worker };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getServicesOfUser(dni: string) {
  try {
    const services = await prisma.service.findMany({
      where: {
        client_dni: dni,
      },
    });
    return { success: true, message: services };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getServicesOfWorker(dni: string) {
  try {
    const services = await prisma.service.findMany({
      where: {
        worker_dni: dni,
      },
    });
    return { success: true, message: services };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function updateUser(dni: string, user: User) {
  try {
    const client = await prisma.user.update({
      where: {
        dni: dni,
      },
      data: user,
    });
    return { success: true, message: client };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function updateWorker(dni: string, worker: Worker) {
  try {
    const newWorker = await prisma.worker.update({
      where: {
        user_dni: dni,
      },
      data: worker,
    });
    return { success: true, message: newWorker };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function updateService(id: number, service: Service) {
  try {
    const newService = await prisma.service.update({
      where: {
        id: id,
      },
      data: service,
    });
    return { success: true, message: newService };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function deleteUser(dni: string) {
  try {
    const client = await prisma.user.delete({
      where: {
        dni: dni,
      },
    });
    return { success: true, message: client };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function deleteService(id: string) {
  try {
    const service = await prisma.service.delete({
      where: {
        id: Number(id),
      },
    });
    return { success: true, message: service };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function updateScoreUser(dni: string, score: number) {
  try {
    const client = await prisma.user.update({
      where: {
        dni: dni,
      },
      data: {
        score: score,
      },
    });
    return { success: true, message: client };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getServicesByCategory(category: string) {
  try {
    const services = await prisma.service.findMany({
      where: {
        categories: category,
      },
    });
    return { success: true, message: services };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getWorkersByCategory(category: string) {
  try {
    const workers = await prisma.worker.findMany({
      where: {
        service_type: category,
      },
    });
    return { success: true, message: workers };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return { success: true, message: user };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function updloadProfilePicture(dni: string, url: string) {
  try {
    const client = await prisma.user.update({
      where: {
        dni: dni,
      },
      data: {
        profile_picture: url,
      },
    });
    return { success: true, message: client };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

export default {
  createUser,
  createWorker,
  createService,
  getAllServices,
  getAllWorkers,
  getAllUsers,
  getUserByDni,
  getWorkerByDni,
  getServicesOfUser,
  getServicesOfWorker,
  updateUser,
  updateWorker,
  updateService,
  deleteUser,
  deleteService,
  updateScoreUser,
  getServicesByCategory,
  getWorkersByCategory,
  getUserByEmail,
  updloadProfilePicture,
};

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
    // console.log(error);
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

async function updateScoreWorker(id: number, score: number) {
  try {
    const service = await prisma.service.update({
      where: {
        id: id,
      },
      data: {
        worker_score: score,
      },
    });
    return { success: true, message: service };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function updateScoreUser(id: number, score: number) {
  try {
    const service = await prisma.service.update({
      where: {
        id: id,
      },
      data: {
        client_score: score,
      },
    });
    return { success: true, message: service };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getScoreService(id: number) {
  try {
    const service = await prisma.service.findUnique({
      where: {
        id: id,
      },
    });
    return {
      success: true, message: {
        client_score: service?.client_score,
        worker_score: service?.worker_score
      }
    };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function setScoreUser(id: string, score: number) {
  try {
    const service = await prisma.service.findUnique({
      where: {
        id: Number(id),
      }
    });

    const result = await prisma.service.aggregate({
      where: {
        client_dni: service?.client_dni
      },
      _avg: {
        client_score: true
      }
    });

    const average = result._avg.client_score ?? 0;

    await prisma.user.update({
      where: {
        dni: service?.client_dni
      },
      data: {
        score: average
      }
    });

    return { success: true, message: average };

  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function setScoreWorker(id: string, score: number) {
  try {
    const service = await prisma.service.findUnique({
      where: {
        id: Number(id),
      }
    });

    const result = await prisma.service.aggregate({
      where: {
        worker_dni: service?.worker_dni
      },
      _avg: {
        worker_score: true
      }
    });

    const average = result._avg.worker_score ?? 0;

    await prisma.user.update({
      where: {
        dni: service?.worker_dni
      },
      data: {
        score: average
      }
    });

    return { success: true, message: average };

  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getScoreUser(dni: string) {
  try {
    const client = await prisma.user.findUnique({
      where: {
        dni: dni,
      }
    });
    if (!client) throw new Error("User not found");
    return { success: true, message: client?.score };
  } catch (error: Error | any) {
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
  getScoreService,
  getScoreUser,
  updateScoreWorker,
  setScoreUser,
  setScoreWorker
};

import { DBconstants as constants } from "../../../constants/database";
import {
  UserInterface as User,
  WorkerInterface as Worker,
  ServiceInterface as Service,
  ServiceStatus as Status,
  WorkerPostulationsInterface as workerPostulations,
} from "../../interfaces/models";

const prisma = constants.prisma;

// USER BASICS FUNCTIONS
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

async function getAllUsers() {
  try {
    const clients = await prisma.user.findMany();
    if (!clients) return { success: false, message: "Not Users in database" };
    return { success: true, message: clients };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function updateUser(dni: string, data: any) {
  try {
    const client = await prisma.user.update({
      where: {
        dni: dni,
      },
      data,
    });
    return { success: true, message: client };
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

async function getUserWhere(data: any) {
  try {
    const client = await prisma.user.findFirst({
      where: data,
    });
    if (!client) return { success: false, message: "User not found" };
    return { success: true, message: client };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getUsersWhere(data: any) {
  try {
    const clients = await prisma.user.findMany({
      where: data,
    });
    if (!clients) return { success: false, message: "Users not found" };
    return { success: true, message: clients };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

// WORKER BASICS FUNCTIONS
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

async function getAllWorkers() {
  try {
    const workers = await prisma.worker.findMany();
    return { success: true, message: workers };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function updateWorker(dni: string, data: any) {
  try {
    const newWorker = await prisma.worker.update({
      where: {
        user_dni: dni,
      },
      data,
    });
    return { success: true, message: newWorker };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function deleteWorker(dni: string) {
  try {
    const worker = await prisma.worker.delete({
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

async function getWorkerWhere(data: any) {
  try {
    const worker = await prisma.worker.findFirst({
      where: data,
    });
    if (!worker) return { success: false, message: "Worker not found" };
    return { success: true, message: worker };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getWorkersWhere(data: any) {
  try {
    const workers = await prisma.worker.findMany({
      where: data,
    });
    if (!workers) return { success: false, message: "Workers not found" };
    return { success: true, message: workers };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

// SERVICE BASICS FUNCTIONS
async function createService(service: any) {
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

async function getAllServices(page: number) {
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  try {
    const services = await prisma.service.findMany({
      skip: skip,
      take: pageSize,
      include: {
        User: {
          select: {
            name: true,
            last_name: true,
            email: true,
            profile_picture: true,
          },
        },
        Worker: {
          select: {
            User: {
              select: {
                name: true,
                last_name: true,
                email: true,
                profile_picture: true,
              },
            },
          },
        },
        Status: true,
      },
    });

    const mappedServices = services.map((service) => ({
      ...service,
      service_status: service.Status?.value, // Utilizar el valor de "value" en lugar del ID
    }));

    return { success: true, message: mappedServices };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}


async function getAllServicesWhere(data: any) {
  try {
    const services: any = await prisma.service.findMany({
      where: data,
      include: {
        User: {
          select: {
            name: true,
            last_name: true,
            email: true,
            profile_picture: true,
            score: true,
          },
        },
        Worker: {
          select: {
            User: {
              select: {
                name: true,
                last_name: true,
                email: true,
                profile_picture: true,
              },
            },
          },
        },
        Status: true,
      },
    });
    const mappedServices = services.map((service: any) => {
      const worker = service.Worker?.User;
      const status = service.Status?.value;

      delete service.Status;
      delete service.Worker;

      return {
        ...service,
        Worker: worker,
        service_status: status, // Utilizar el valor de "value" en lugar del ID
      };
    });
    return { success: true, message: mappedServices };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getServiceWhere(data: any) {
  try {
    const service: any = await prisma.service.findFirst({
      where: data,
      include: {
        User: {
          select: {
            name: true,
            last_name: true,
            email: true,
            profile_picture: true,
          },
        },
        Worker: {
          select: {
            User: {
              select: {
                name: true,
                last_name: true,
                email: true,
                profile_picture: true,
              },
            },
          },
        },
        Status: {
          select: {
            value: true,
          },
        },
      },
    });

    const mappedService = {
      ...service,
      service_status: service?.Status?.value, // Utilizar el valor de "value" en lugar del ID
    };

    const worker = mappedService?.Worker?.User;

    delete mappedService?.Status;
    delete mappedService?.Worker;

    mappedService.Worker = worker;

    return { success: true, message: mappedService };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function selectServices(id: number, data: any) {
  try {
    const response = await prisma.service.findMany({
      where: {
        id: id,
      },
      select: data,
    });
    return { success: true, message: response };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function updateService(id: number, data: any) {
  try {
    const newService = await prisma.service.update({
      where: {
        id: id,
      },
      data: data,
    });
    return { success: true, message: newService };
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

// WORKERPOSULATIONS BASICS FUNCTIONS
async function createWorkerPosulation(workerPosulation: any) {
  try {
    const newWorkerPosulation = await prisma.workerPostulations.create({
      data: workerPosulation,
    });
    return { success: true, message: newWorkerPosulation };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function deleteWorkerPosulation(id_service: number) {
  try {
    const workerPosulation = await prisma.workerPostulations.deleteMany({
      where: {
        service_id: id_service
      },
    });
    return { success: true, message: workerPosulation };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getAllWorkerPosulations(data: any) {
  try {
    const workerPosulations = await prisma.workerPostulations.findMany({
      select: {
        worker_dni: true,
      },
      where: data,
    });

    return { success: true, message: workerPosulations };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

// MULTIFUNCTIONS
async function setScoreUser(id: string, dni: string, score: number) {
  try {
    const service = await updateService(Number(id), { client_score: score });

    if (!service.success) return service;

    const client = await getServiceWhere({ id: Number(id), client_dni: dni });

    if (!client.success)
      return { success: false, message: "No se encontró el servicio" };

    const result = await prisma.service.aggregate({
      where: {
        client_dni: dni,
      },
      _avg: {
        client_score: true,
      },
    });

    const average = result._avg.client_score ?? 0;

    const userUpdated = await updateUser(dni, { score: average });

    return { success: true, message: userUpdated };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function setScoreWorker(id: string, dni: string, score: number) {
  try {
    const service = await updateService(Number(id), { worker_score: score });

    if (!service.success) return service;

    const worker = await getServiceWhere({ id: Number(id), worker_dni: dni });

    if (!worker.success)
      return { success: false, message: "No se encontró el servicio" };

    const result = await prisma.service.aggregate({
      where: {
        worker_dni: dni,
      },
      _avg: {
        worker_score: true,
      },
    });

    const average = result._avg.worker_score ?? 0;

    const workerUpdated = await updateWorker(dni, { score: average });

    return { success: true, message: workerUpdated };
  } catch (error: Error | any) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

async function getPostulations(id_service: number) {
  try {
    const postulations = await prisma.workerPostulations.findMany({
      where: {
        service_id: id_service,
      },
    });
    return { success: true, message: postulations };
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
  updateUser,
  updateWorker,
  updateService,
  deleteUser,
  deleteService,
  setScoreUser,
  setScoreWorker,
  getAllServicesWhere,
  getServiceWhere,
  getUserWhere,
  getUsersWhere,
  getWorkerWhere,
  getWorkersWhere,
  selectServices,
  createWorkerPosulation,
  deleteWorkerPosulation,
  getAllWorkerPosulations,
  getPostulations,
};

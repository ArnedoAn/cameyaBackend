import { User, Worker, Service } from "@prisma/client";

export interface UserInterface extends User {}
export interface WorkerInterface extends Worker {}
export interface ServiceInterface extends Service {}

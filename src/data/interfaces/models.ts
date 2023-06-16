import { User, Worker, Service } from "@prisma/client";

export interface UserInterface extends User {}
export interface WorkerInterface extends Worker {}
export interface ServiceInterface extends Service {}
export enum ServiceStatus {
  "Not Assigned" = 0,
  "Assigned" = 1,
  "In Progress" = 2,
  "Completed" = 3,
}

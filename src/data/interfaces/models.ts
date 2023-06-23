import { User, Worker, Service, WorkerPostulations, Admin } from "@prisma/client";

export interface UserInterface extends User {}
export interface WorkerInterface extends Worker {}
export interface ServiceInterface extends Service {}
export interface WorkerPostulationsInterface extends WorkerPostulations {}
export interface AdminInterface extends Admin {}
export enum ServiceStatus {
  "Not Assigned" = 0,
  "Assigned" = 1,
  "In Progress" = 2,
  "Completed" = 3,
}

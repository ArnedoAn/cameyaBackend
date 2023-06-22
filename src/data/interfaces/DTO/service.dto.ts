import { ServiceStatus, ServiceInterface } from "../models";

export interface ServiceDTOPOST {
  address: string;
  total_price: number;
  service_status: ServiceStatus;
  service_description: string;
  service_title: string;
  categories: string[];
  client_dni: string;
  date_programmed: Date;
}

export interface ServiceDTOGET {
  id: number;
  address: string;
  total_price: number;
  service_status: ServiceStatus;
  client_score: number;
  worker_score: number;
  service_description: string;
  categories: string[];
  service_type: string;
  client_dni: string;
  worker_dni: string;
  User: {
    name: string;
    last_name: string;
    email: string;
    profile_picture: string;
    score: number;
  };
  Worker: {
    name: string;
    last_name: string;
    email: string;
    profile_picture: string;
  };
}

export interface ServiceDTOUPDATE extends Partial<ServiceInterface> {}

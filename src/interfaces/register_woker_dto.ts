import { RegisterClientDTO } from "./register_client_dto";

export interface RegisterWorkerDTO extends RegisterClientDTO {
  serviceType: string;
  description: string;
  pricePerHour: number;
}

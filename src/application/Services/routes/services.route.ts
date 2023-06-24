import express from "express";
import MngService from "../services/services.service";
import {
  ServiceDTOUPDATE,
  WorkerPostulationDTO,
} from "../../../data/interfaces/DTO/service.dto";
import { ServiceInterface } from "../../../data/interfaces/models";

const router = express.Router(); // Route: /service

router.get("/all/:page", async (req, res) => {
  const response = await MngService.getAllServices(Number(req.params.page) as number);
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const response = await MngService.getService(id);
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.post("/postulation", async (req, res) => {
  const { id, worker_postulations, worker_dni } =
    req.body as WorkerPostulationDTO;
  const response = await MngService.addWorkerPostulation(
    id,
    worker_postulations,
    worker_dni
  );
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.post("/create", async (req, res) => {
  const response = await MngService.createService(req.body as ServiceInterface);
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.post("/suser", async (req, res) => {
  const response = await MngService.getServicesOfUser(req.body.dni as string);
  console.log(req.body.dni);
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.post("/sworker", async (req, res) => {
  const response = await MngService.getServicesOfWorker(req.body.dni as string);
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.post("/scategory", async (req, res) => {
  const response = await MngService.getServicesByCategory(
    req.body.categories as string[]
  );
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.put("/update", async (req, res) => {
  const response = await MngService.updateService(req.body as ServiceDTOUPDATE);
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.delete("/delete", async (req, res) => {
  const response = await MngService.deleteService(req.body.id as string);
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.put("/updatePostulation", async (req, res) => {
  const response = await MngService.updateServiceNotAssigned(
    req.body.id_service as number,
    req.body.id_worker as string,
  );
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.get("/getPostulations/:id", async (req, res) => {
  const id = req.params.id;
  const response = await MngService.getPostulations(Number(id) as number);
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

export default router;

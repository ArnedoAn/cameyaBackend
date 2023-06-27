import express from "express";
import workerService from "../services/worker.service";
import { WorkerInterface } from "../../../data/interfaces/models";
import { WorkerPostulations } from "@prisma/client";

const router = express.Router(); // Route: /worker

router.post("/profile", async (req, res) => {
  const response = await workerService.getProfileData(req.body.dni as string);
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.put("/profile", async (req, res) => {
  const response = await workerService.modifyProfileData(
    req.body as WorkerInterface
  );
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.put("/score", async (req, res) => {
  const { service_id, dni, score } = req.body;
  const response = await workerService.setScoreWorker(
    service_id as number,
    dni as string,
    score as number
  );
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.get("/score/:id", async (req, res) => {
  const id = Number(req.params.id);
  const response = await workerService.getScoreWorker(id as number);
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.post("/AddPostulation", async (req, res) => {
  const response = await workerService.addWorkerPostulation(
    req.body as WorkerPostulations
  );
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.put("/RetireFromService", async (req, res) => {
  const response = await workerService.retireFromService(
    req.body as WorkerPostulations
  );
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.put("/TerminateService", async (req, res) => {
  const { service_id } = req.body;
  const response = await workerService.terminateService(service_id as number);
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

export default router;

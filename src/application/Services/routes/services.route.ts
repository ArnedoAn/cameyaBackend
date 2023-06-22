import express from "express";
import MngService from "../services/services.service";
import { ServiceDTOPOST, ServiceDTOUPDATE } from "../../../data/interfaces/DTO/service.dto";
import { ServiceInterface } from "../../../data/interfaces/models";

const router = express.Router(); // Route: /services

router.get("/", async (req, res) => {
  const response = await MngService.getServicesNotAssigned();
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.post("/create", async (req, res) => {
  const response = await MngService.createService(req.body as ServiceInterface);
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.post("/suser", async (req, res) => {
  const response = await MngService.getServicesOfUser(req.body.id as string);
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.post("/sworker", async (req, res) => {
  const response = await MngService.getServicesOfWorker(req.body.id as string);
  if (!response.success) return res.status(400).json(response);
  return res.status(200).json(response);
});

router.post("/scategory", async (req, res) => {
  const response = await MngService.getServicesByCategory(
    req.body.category as string
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

export default router;

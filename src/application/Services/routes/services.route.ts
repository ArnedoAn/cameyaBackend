import express from "express";
import MngService from "../services/services.service";
import { ServiceInterface } from "../../../data/interfaces/models";

const router = express.Router(); // Route: /services

router.get("/", async (req, res) => { 
  res.send("Client route");
});

router.post("/create", async (req, res) => {
  const response = await MngService.createService(req.body as ServiceInterface);
  res.json(response);
});

router.get('/suser', async (req, res) => {
  const response = await MngService.getServicesOfUser(req.body.id as string);
  res.json(response);
});

router.get('/sworker', async (req, res) => {
  const response = await MngService.getServicesOfWorker(req.body.id as string);
  res.json(response);
});

router.get('/scategory', async (req, res) => {
  const response = await MngService.getServicesByCategory(req.body.category as string);
  res.json(response);
});

router.put('/update', async (req, res) => {
  const response = await MngService.updateService(req.body as ServiceInterface);
  res.json(response);
});

router.delete('/delete', async (req, res) => {
  const response = await MngService.deleteService(req.body.id as string);
  res.json(response);
});

export default router;

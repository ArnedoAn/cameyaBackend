import express from "express";
import clientService from "../services/client.service";
import { UserInterface } from "../../../data/interfaces/models";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Client route");
});

router.get("/profile", async (req, res) => {
  const response = await clientService.getProfileData(req.body.id as string);
  res.json(response);
});

router.put("/profile", async (req, res) => {
  const response = await clientService.modifyProfileData(req.body as UserInterface);
  res.json(response);
});

router.put("/profile/profile_picture", async (req, res) => {
  
});

export default router;

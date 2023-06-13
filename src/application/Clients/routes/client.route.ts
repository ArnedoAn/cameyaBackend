import express from "express";
import multer from "multer";
import clientService from "../services/client.service";
import { UserInterface } from "../../../data/interfaces/models";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", async (req, res) => {
  res.send("Client route");
});

router.post("/profile", async (req, res) => {
  const response = await clientService.getProfileData(req.body.id as string);
  res.json(response);
});

router.put("/profile", async (req, res) => {
  const response = await clientService.modifyProfileData(
    req.body as UserInterface
  );
  res.json(response);
});

router.post(
  "/profile/profile_picture",
  upload.single("image"),
  async (req, res) => {
    console.log(req.file);
    const { dni } = req.body;
    const response = await clientService.uploadProfilePicture(
      req.file as Express.Multer.File,
      dni as string
    );
    res.json(response);
  }
);

router.put('/score', async (req, res) => {
  const { id, score } = req.body;
  const response = await clientService.setScoreWorker(id as number, score as number);
  res.json(response);
});

router.get('/score', async (req, res) => {
  const { id } = req.body;
  const response = await clientService.getScoreUser(id as number);
  res.json(response);
});

export default router;

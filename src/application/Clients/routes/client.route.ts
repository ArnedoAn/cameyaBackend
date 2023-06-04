import express from "express";
import multer from "multer";
import clientService from "../services/client.service";
import { UserInterface } from "../../../data/interfaces/models";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", async (req, res) => {
  res.send("Client route");
});

router.get("/profile", async (req, res) => {
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
    const response = await clientService.uploadProfilePicture(
      req.file as Express.Multer.File
    );
    res.json(response);
  }
);

router.get("/profile/profile_picture", async (req, res) => {
  const response = await clientService.getProfilePicture(
    req.body.imageName as string
  );
  if (!response.success) {
    res.status(404).json(response);
  }
  res.sendFile(response.message);
});

export default router;

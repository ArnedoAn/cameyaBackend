import express from "express";
import workerService from "../services/worker.service";
import { WorkerInterface } from "../../../data/interfaces/models";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get('/profile', async (req, res) => {
    const response = await workerService.getProfileData(req.body.dni as string);
    res.json(response);
});

router.put('/profile', async (req, res) => {
    const response = await workerService.modifyProfileData(req.body as WorkerInterface);
    res.json(response);
});

router.post(
    "/profile/profile_picture",
    upload.single("image"),
    async (req, res) => {
        console.log(req.file);
        const { dni } = req.body;
        const response = await workerService.uploadProfilePicture(
            req.file as Express.Multer.File,
            dni as string
        );
        res.json(response);
    }
);

export default router;
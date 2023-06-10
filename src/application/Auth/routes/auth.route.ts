import express, { Request, Response } from "express";
import registerService from "../services/register.service";
import loginService from "../services/login.service";
import googleService from "../services/google.service";
import { googleDTO } from "../../../data/interfaces/auth_interfaces/google_dto";

const router = express.Router(); // RUTA: /auth (Los codigos HTTP son innexactos, solo para referencia)

router.post("/register", async (req: Request, res: Response) => {
  const response = await registerService.registerUserFromForm(req.body);
  if (response.success) {
    res.status(201).json(response);
  }
  res.status(400).json(response);
});

router.post("/login", async (req: Request, res: Response) => {
  const response = await loginService.loginUserFromForm(req.body);
  if (response.success) {
    res.status(200).json(response);
  }
  res.status(400).json(response);
});

router.get("/login", async (req: Request, res: Response) => {
  res.json({ success: false, message: "User not logged in" });
});

router.get("/logout", async (req: Request, res: Response) => {
  res.json({ success: false, message: "User not logged in" });
});

router.get("/google", async (req: Request, res: Response) => {
  const response = await googleService.validateGoogleUser(
    req.body as googleDTO
  );
  if (response?.success) {
    res.status(200).json(response);
  } else if (
    response?.success === false &&
    response?.message === "Fatal error"
  ) {
    res.status(500).json(response);
  }
  res.status(400).json(response);
});

export default router;

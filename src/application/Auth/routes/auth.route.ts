import express, { Request, Response } from "express";
import passport from "passport";
import { googleDTO } from "../../../data/interfaces/auth_interfaces/google_dto";
import registerService from "../services/register.service";
import loginService from "../services/login.service";

const router = express.Router(); // RUTA: /auth

router.post("/register", async (req: Request, res: Response) => {
  const response = await registerService.registerUserFromForm(req.body);
  res.json(response);
});

router.post("/login", async (req: Request, res: Response) => {
  const response = await loginService.loginUserFromForm(req.body);
  res.json(response);
});

router.get("/login", async (req: Request, res: Response) => {
  res.json({ success: false, message: "User not logged in" });
});

router.get("/logout", async (req: Request, res: Response) => {
  res.send("Logout");
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    session: false,
  }),
  async (req, res: Response) => {
    const user: googleDTO = req.user as googleDTO;
    const response = await registerService.registerUserFromGoogle(user);
    res.json(response);
  }
);

export default router;

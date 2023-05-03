import express, { Request, Response } from "express";
import passport from "passport";
import { googleDTO } from "../../../data/interfaces/auth_interfaces/google_dto";
import registerService from "../services/register_service";
import loginService from "../services/login_service";

const router = express.Router(); // RUTA: /auth

router.post("/register", async (req: Request, res: Response) => {
  const response = await registerService.registerUserFromForm(req.body);
  res.json(response);
});

router.post("/login", async (req: Request, res: Response) => {
  const response = await loginService.loginUserFromForm(req.body);
  res.json(response);
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
  passport.authenticate("google", { failureRedirect: "/auth/login" }),
  async (req, res: Response) => {
    const user = req.user as googleDTO;
    const response = await registerService.registerUserFromGoogle(user);
    if (!response.success) {
      res.send("Error");
    }
    res.redirect("/");
  }
);

export default router;

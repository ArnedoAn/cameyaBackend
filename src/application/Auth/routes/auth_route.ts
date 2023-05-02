import express, { Request, Response } from "express";
import passport from "passport";
import { googleDTO } from "../../../data/interfaces/auth_interfaces/google_dto";

const router = express.Router();

router.get("/login", (req: Request, res: Response) => {
  res.send("Login");
});

router.get("/logout", (req: Request, res: Response) => {
  res.send("Logout");
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login" }),
  (req, res: Response) => {
    const user = req.user as googleDTO;
    req.session
    console.log(user.displayName);
    res.redirect("/");
  }
);

export default router;

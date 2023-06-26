import express, { Request, Response } from "express";
const router = express.Router(); //admin
import adminService from "../services/admin.service";
import { RegisterCategories } from "@prisma/client";

router.post("/login", async (req: Request, res: Response) => {
    const response = await adminService.loginAdminFromForm(req.body);
    if (response.success) {
        return res.status(200).json(response);
    }
    return res.status(400).json(response);
});

router.post("/createCategory", async (req: Request, res: Response) => {
    const response = await adminService.createCategory(req.body as RegisterCategories);
    if (response.success) {
        return res.status(200).json(response);
    }
    return res.status(400).json(response);
});

router.get("/getCategories", async (req: Request, res: Response) => {
    const data = await adminService.getCategories();
    if (data.success) {
        return res.status(200).json(data);
    }
    return res.status(400).json(data);
});

router.get("/getCategory/:id", async (req: Request, res: Response) => {
    const data = await adminService.getCategory(parseInt(req.params.id));
    if (data.success) {
        return res.status(200).json(data);
    }
    return res.status(400).json(data);
});

router.delete("/deleteCategory/:id", async (req: Request, res: Response) => {
    const data = await adminService.deleteCategory(parseInt(req.params.id));
    if (data.success) {
        return res.status(200).json(data);
    }
    return res.status(400).json(data);
});

router.delete("/deleteService/:id", async (req: Request, res: Response) => {
    const data = await adminService.deleteService(parseInt(req.params.id));
    if (data.success) {
        return res.status(200).json(data);
    }
    return res.status(400).json(data);
});

router.delete("/deleteUser/:id", async (req: Request, res: Response) => {
    const data = await adminService.deleteUser(req.params.id);
    if (data.success) {
        return res.status(200).json(data);
    }
    return res.status(400).json(data);
});

router.get("/logout", async (req: Request, res: Response) => {
    res.json({ success: false, message: "User not logged in" });
});

export default router;
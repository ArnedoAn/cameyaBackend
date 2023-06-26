import express, { Request, Response } from "express";
const router = express.Router(); //admin
import loginService from "../../Auth/services/login.service";
import adminService from "../services/admin.service";
import { RegisterCategories } from "@prisma/client";

router.post("/login", async (req: Request, res: Response) => {
    const response = await loginService.loginUserFromForm(req.body);
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

router.get("/getCategories/:page", async (req: Request, res: Response) => {
    const data = await adminService.getCategories(Number(req.params.page) as number);
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

router.put("/updateCategory/:id", async (req: Request, res: Response) => {
    const data = await adminService.updateCategory(parseInt(req.params.id), req.body);
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

export default router;
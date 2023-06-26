import AdminController from "../../../data/controllers/database/Admin.controller";
import { RegisterCategories } from "@prisma/client";

async function createCategory(data: RegisterCategories) {
    const response = await AdminController.createCategory(data);
    if (!response.success) return { success: false, message: response.message };
    return { success: true, message: response.message };
}

async function getCategories(page: number) {
    const response = await AdminController.getCategories(page);
    if (!response.success) return { success: false, message: response.message };
    return { success: true, message: response.message };
}

async function getCategory(id: number) {
    const response = await AdminController.getCategory(id);
    if (!response.success) return { success: false, message: response.message };
    return { success: true, message: response.message };
}

async function deleteCategory(id: number) {
    const response = await AdminController.deleteCategory(id);
    if (!response.success) return { success: false, message: response.message };
    return { success: true, message: response.message };
}

async function updateCategory(id: number, data: RegisterCategories) {
    const response = await AdminController.updateCategory(id, data);
    if (!response.success) return { success: false, message: response.message };
    return { success: true, message: response.message };
}

export default {
    createCategory,
    getCategories,
    getCategory,
    deleteCategory,
    updateCategory
};


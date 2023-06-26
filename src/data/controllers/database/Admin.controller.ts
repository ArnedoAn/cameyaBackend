import { RegisterCategories } from "@prisma/client";
import { DBconstants as constants } from "../../../constants/database";
import db_controller from "./db_controller";
import { LoginDTO } from "../../interfaces/auth_interfaces/login_dto";
const prisma = constants.prisma;

async function createCategory(data: RegisterCategories) {
    try {
        const response = await prisma.registerCategories.create({
            data: data
        });
        return { success: true, message: response };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

async function getCategories() {
    const categories = await db_controller.getAllCategories();
    if (categories.success) {
        return {success: true, message: categories.message};
    }
    return { success: false, message: categories.message };
}

async function getCategory(id: number) {
    try {
        const response = await prisma.registerCategories.findUnique({
            where: {
                id: id
            }
        });
        return { success: true, message: response };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

async function deleteCategory(id: number) {
    try {
        const response = await prisma.registerCategories.delete({
            where: {
                id: id
            }
        });
        return { success: true, message: response };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

async function deleteService(id: number) {
    try {
        const response = await prisma.service.delete({
            where: {
                id: id
            }
        });
        return { success: true, message: response };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

async function deleteUser(id: string) {
    try {
        const response = await prisma.user.delete({
            where: {
                dni: id
            }
        });
        return { success: true, message: response };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

async function getAdminByEmail(adminEmail: string) {
    try{
        const response = await prisma.admin.findUnique({
            where: {
                email: adminEmail
            }
        });
        return { success: true, message: response };
    }catch(error: Error | any){
        return { success: false, message: error.message };
    }
}


export default {
    createCategory,
    getCategories,
    getCategory,
    deleteCategory,
    deleteService,
    deleteUser,
    getAdminByEmail
};
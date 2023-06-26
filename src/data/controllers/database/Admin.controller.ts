import { RegisterCategories } from "@prisma/client";
import { DBconstants as constants } from "../../../constants/database";
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

async function getCategories(page: number) {
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    try {
        const response = await prisma.registerCategories.findMany({
            skip: skip,
            take: pageSize,
        });
        return { success: true, message: response };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
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

async function updateCategory(id: number, data: RegisterCategories) {
    try {
        const response = await prisma.registerCategories.update({
            where: {
                id: id
            },
            data: data
        });
        return { success: true, message: response };
    } catch (error: Error | any) {
        return { success: false, message: error.message };
    }
}

export default {
    createCategory,
    getCategories,
    getCategory,
    deleteCategory,
    updateCategory
};
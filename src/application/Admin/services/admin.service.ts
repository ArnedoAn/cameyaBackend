import AdminController from "../../../data/controllers/database/Admin.controller";
import { Admin, RegisterCategories } from "@prisma/client";
import { LoginDTO } from "../../../data/interfaces/auth_interfaces/login_dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { servicesConstanst } from "../../../constants/services";
const secretKey = servicesConstanst.jwtSecret;

async function createCategory(data: RegisterCategories) {
    const response = await AdminController.createCategory(data);
    if (!response.success) return { success: false, message: response.message };
    return { success: true, message: response.message };
}

async function getCategories() {
    const response = await AdminController.getCategories();
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

async function deleteService(id: number) {
    const response = await AdminController.deleteService(id);
    if (!response.success) return { success: false, message: response.message };
    return { success: true, message: response.message };
}

async function deleteUser(id: string) {
    const response = await AdminController.deleteUser(id);
    if (!response.success) return { success: false, message: response.message };
    return { success: true, message: response.message };
}

async function loginAdminFromForm(admin: LoginDTO) {
    const data = await AdminController.getAdminByEmail(admin.email);
    if (!data.success || data.message === null) {
      return { success: false, message: "Invalid email or password" };
    }
    if (
      (await validatePassword(admin.password, data.message.password)) === false
    ) {
      return { success: false, message: "Invalid password" };
    }
    delete data.message.password;
    return {
      success: true,
      message: data.message,
      token: await generateToken(admin.email, admin.password),
    };
  }
  
  async function validatePassword(pwd: string, pwdHashed: string) {
    return await bcrypt.compare(pwd, pwdHashed);
  }
  
  async function generateToken(email: string, password: string) {
    return jwt.sign({ email, password }, secretKey as string);
  }

  async function createAdmin(admin:Admin) {
    const data = await AdminController.createAdmin(admin)
    return { success: true, message: "Admin rigth" };
  }

export default {
    createCategory,
    getCategories,
    getCategory,
    deleteCategory,
    deleteService,
    deleteUser,
    loginAdminFromForm,
    createAdmin
};


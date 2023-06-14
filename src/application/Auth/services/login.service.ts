import dbController from "../../../data/controllers/db_controller";
import { LoginDTO } from "../../../data/interfaces/auth_interfaces/login_dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { servicesConstanst } from "../../../constants/services";

const secretKey = servicesConstanst.jwtSecret;

async function loginUserFromForm(user: LoginDTO) {
  const client = await dbController.getUserByEmail(user.email);
  if (!client.success || client.message === null) {
    return { success: false, message: "Invalid email or password" };
  }
  if (
    (await validatePassword(user.password, client.message.password)) === false
  ) {
    return { success: false, message: "Invalid password" };
  }
  delete client.message.password;
  return {
    success: true,
    message: client.message,
    token: await generateToken(user.email, user.password),
  };
}

async function validatePassword(pwd: string, pwdHashed: string) {
  return await bcrypt.compare(pwd, pwdHashed);
}

async function generateToken(email: string, password: string) {
  return jwt.sign({ email, password }, secretKey as string);
}

export default { loginUserFromForm };

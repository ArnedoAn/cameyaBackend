import { LoginDTO } from "../../../data/interfaces/auth_interfaces/login_dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { servicesConstanst } from "../../../constants/services";
import userController from "../../../data/controllers/database/User.controller";

const secretKey = servicesConstanst.jwtSecret;

async function loginUserFromForm(user: LoginDTO) {
  console.log(user);
  const client = await userController.getUserByEmail(user.email);
  console.log(client);
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
  console.log(pwd, pwdHashed);
  return await bcrypt.compare(pwd, pwdHashed);
}

async function generateToken(email: string, password: string) {
  return jwt.sign({ email, password }, secretKey as string);
}

export default { loginUserFromForm };

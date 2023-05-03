import dbController from "../../../data/controllers/db_controller";
import { LoginDTO } from "../../../data/interfaces/auth_interfaces/login_dto";
import bcrypt from "bcrypt";

async function loginUserFromForm(user: LoginDTO) {
  const client = await dbController.getUserByEmail(user.email);
  if (!client.success) {
    return client;
  }
  if (
    (await validatePassword(user.password, client.message.password)) === false
  ) {
    return { success: false, message: "Invalid password" };
  }
  return { success: true, message: "Signed in!" };
}

async function loginUserFromGoogle(user: LoginDTO) {
  const client = await dbController.getUserByEmail(user.email);
  console.log(client)
  if (!client.success) {
    return client;
  }
  return { success: true, message: "Signed in!" };
}

async function validatePassword(pwd: string, pwdHashed: string) {
  return await bcrypt.compare(pwd, pwdHashed);
}

export default { loginUserFromForm, loginUserFromGoogle };

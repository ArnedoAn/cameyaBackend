import dbController from "../../../data/controllers/db_controller";
import { UserInterface as User } from "../../../data/interfaces/models";
import { googleDTO } from "../../../data/interfaces/auth_interfaces/google_dto";
import bcrypt from "bcrypt";

async function registerUserFromForm(user: User) {
  user.password = await encryptPassword(user.password);
  const response = await dbController.createUser(user);
  if (!response.success && response.message === "P2002") {
    return { success: false, message: "User already registered" };
  }
  return response;
}

async function registerUserFromGoogle(user: googleDTO) {
  const userToDB: User = {
    dni: "", // Provisional dni [Change this]
    dni_type: "",
    name: user.given_name,
    last_name: user.family_name,
    email: user.email,
    password: await encryptPassword(user.sub),
    phone: "",
    address: "",
    profile_picture: user.picture,
    birth_date: "",
    score: 0,
    is_worker: false,
  };

  return userToDB;
}

async function encryptPassword(pwd: string) {
  return await bcrypt.hash(pwd, 10);
}

async function isRegistered(email: string) {
  const response = await dbController.getUserByEmail(email);
  console.log(response);
  if (
    (response.success && response.message === null) ||
    response.success === false
  ) {
    return false;
  }
  return true;
}

export default { registerUserFromForm, registerUserFromGoogle, isRegistered };

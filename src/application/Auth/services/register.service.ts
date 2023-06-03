import dbController from "../../../data/controllers/db_controller";
import { UserInterface as User } from "../../../data/interfaces/models";
import { googleDTO } from "../../../data/interfaces/auth_interfaces/google_dto";
import bcrypt from "bcrypt";

async function registerUserFromForm(user: User) {
  user.password = await encryptPassword(user.password);
  const response = await dbController.createUser(user);
  return response;
}

async function registerUserFromGoogle(user: googleDTO) {
  const userToDB: User = {
    dni: user._json.family_name, // Provisional dni [Change this]
    dni_type: "",
    name: user._json.given_name,
    last_name: user._json.family_name,
    email: user._json.email,
    password: await encryptPassword(user._json.sub),
    phone: "",
    address: "",
    profile_picture: user._json.picture,
    birth_date: "",
    score: 0,
    is_worker: false,
  };

  const response = await dbController.createUser(userToDB);
  return response;
}

async function encryptPassword(pwd: string) {
  return await bcrypt.hash(pwd, 10);
}

export default { registerUserFromForm, registerUserFromGoogle };

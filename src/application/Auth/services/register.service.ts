import dbController from "../../../data/controllers/db_controller";
import { UserInterface as User } from "../../../data/interfaces/models";
import { WorkerInterface as Worker } from "../../../data/interfaces/models";
import { googleDTO } from "../../../data/interfaces/auth_interfaces/google_dto";
import bcrypt from "bcrypt";

async function registerUserFromForm(user: any) {
  const findUser = await dbController.getUserByEmail(user.email);

  if (findUser.success && findUser.message !== null) {
    return { success: false, message: "User already registered" };
  } else {
    user.password = await encryptPassword(user.password);
    const userBase = {
      dni: user.dni,
      dni_type: user.dni_type,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      address: user.address,
      profile_picture: user.profile_picture,
      birth_date: user.birth_date,
      score: user.score,
      is_worker: user.is_worker
    } as User;

    const responseU = await dbController.createUser(userBase);

    if (user.is_worker) {
      const worker = {
        user_dni: user.dni,
        service_type: user.service_type,
        service_detail: user.service_detail,
        rate_hour: user.rate_hour,
      } as Worker;

      const responseW = await dbController.createWorker(worker);

      const result = responseU.success && responseW.success;
      if (result) {
        return { success: true, message: "User registered successfully" };
      }else{
        return { success: false, message: "Error registering user" };
      }
    }
  }
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

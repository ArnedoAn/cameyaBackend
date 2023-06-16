import { googleDTO } from "../../../data/interfaces/auth_interfaces/google_dto";
import dbController from "../../../data/controllers/database/db_controller";
import registerService from "./register.service";
import userController from "../../../data/controllers/database/User.controller";

async function validateGoogleUser(input: googleDTO) {
  try {
    const user = await registerService.registerUserFromGoogle(input);
    const client = await userController.getUserByEmail(user.email);
    if (
      client.success ||
      client.message === null ||
      client.message === "P2002"
    ) {
      return { success: false, message: user };
    } else if (client.success && client.message !== null) {
      return { success: true, message: user };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Fatal error" };
  }
}

export default { validateGoogleUser };

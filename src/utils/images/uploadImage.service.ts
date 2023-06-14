import { upload } from "./multer.service";
import { servicesConstanst } from "../../constants/services";

const cloudinary = servicesConstanst.cloudinary;
const profilePictureFolder = "profile_pictures";

async function uploadImage(file: any, id: string) {
  try {
    const response = await cloudinary.uploader.upload(file.path, {
      folder: profilePictureFolder,
      public_id: id,
    });
    return { success: true, message: response.secure_url };
  } catch (err: Error | any) {
    console.log(err);
    return { success: false, message: err.message };
  }
}

export default { upload, uploadImage };

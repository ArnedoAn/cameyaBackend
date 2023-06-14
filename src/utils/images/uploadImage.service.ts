import multer from "multer";
import { servicesConstanst } from "../../constants/services";
import dbController from "../../data/controllers/db_controller";
import e from "express";

const upload = multer({ dest: "uploads/" });
const cloudinary = servicesConstanst.cloudinary;
const profilePictureFolder = "profile_pictures";

async function uploadImage(file: any, id: string) {
  try {
    const response = await cloudinary.uploader.upload(file.path, {
      folder: profilePictureFolder,
      public_id: id,
    });

    const postResponse = await dbController.uploadProfilePicture(
      id,
      response.url
    );
    if (postResponse.success)
      return { success: true, message: "Image uploaded", url: response.url };
    else return { success: false, message: postResponse.message };
  } catch (err: Error | any) {
    console.log(err);
    return { success: false, message: err.message };
  }
}

// const minioBucket = servicesConstanst.minioBucket;
// const minioClient = servicesConstanst.minioClient;

// async function uploadImage(image: Express.Multer.File) {
//   const fileName = image.originalname;
//   try {
//     await minioClient.fPutObject(minioBucket, fileName, image.path);
//     return { success: true, message: "Image uploaded" };
//   } catch (err: Error | any) {
//     console.log(err);
//     return { success: false, message: err.message };
//   }
// }

// async function getImage(imageName: string) {
//   try {
//     const file = await minioClient.getObject(minioBucket, imageName);
//     console.log(file);
//     return { success: true, file: file };
//   } catch (err: Error | any) {
//     console.log(err);
//     return { success: false, message: err.message };
//   }
// }

export default { upload, uploadImage };

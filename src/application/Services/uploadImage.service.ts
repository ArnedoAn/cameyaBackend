import multer from "multer";
import { servicesConstanst } from "../../constants/services";

const upload = multer({ dest: "uploads/" });

const minioBucket = servicesConstanst.minioBucket;
const minioClient = servicesConstanst.minioClient;

async function uploadImage(image: Express.Multer.File) {
  const fileName = image.originalname;
  try {
    await minioClient.fPutObject(minioBucket, fileName, image.path);
    return { success: true, message: "Image uploaded" };
  } catch (err: Error | any) {
    console.log(err);
    return { success: false, message: err.message };
  }
}

async function getImage(imageName: string) {
  try {
    const file = await minioClient.getObject(minioBucket, imageName);
    console.log(file);
    return { success: true, file: file };
  } catch (err: Error | any) {
    console.log(err);
    return { success: false, message: err.message };
  }
}

export default { upload, uploadImage, getImage };

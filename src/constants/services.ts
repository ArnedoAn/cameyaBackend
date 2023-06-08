const Minio = require("minio");
//import * as MinioKeys from "../../credentials.json";
import { config } from "dotenv";
import { v2 as Cloudinary } from "cloudinary";
config();

// const minioClient = new Minio.Client({
//   endPoint: MinioKeys.url,
//   port: 9000,
//   useSSL: true,
//   accessKey: MinioKeys.accessKey,
//   secretKey: MinioKeys.secretKey,
// });

Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const servicesConstanst = {
  // minioClient,
  // minioBucket: "semard",
  cloudinary: Cloudinary,
};

import { config } from "dotenv";
import { v2 as Cloudinary } from "cloudinary";
config();

Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const servicesConstanst = {
  cloudinary: Cloudinary,
  jwtSecret: process.env.JWT_SECRET,
  defaultProfilePicture: "https://res.cloudinary.com/aarnedoe/image/upload/v1687412504/profile_pictures/w1_ibtwas.jpg"
};

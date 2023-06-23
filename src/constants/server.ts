import * as dotenv from "dotenv";
dotenv.config();

export const serverConstants = {
  port: process.env.PORT || 3000,
  session: {
    secret: "secret",
  },
  icon:
    process.env.ICON ||
    "https://res.cloudinary.com/aarnedoe/image/upload/v1687557738/siteImages/chico-gel_fvxke0.ico",
};

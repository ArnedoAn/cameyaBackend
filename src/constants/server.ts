import * as dotenv from "dotenv";
dotenv.config();

export const serverConstants = {
  port: process.env.PORT || 3000,
  session: {
    secret: "secret",
  },
};

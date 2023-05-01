import * as dotenv from "dotenv";
import * as GoogleKeys from "../../keys.json";
import { PrismaClient } from "@prisma/client";
dotenv.config();

export const constants = {
  port: process.env.PORT || 3000,
  database: {
    host: "localhost",
    port: 3306,
  },
  jwt: {},
  google: {
    clientID: GoogleKeys.web.client_id,
    clientSecret: GoogleKeys.web.client_secret,
    callbackURL: "/auth/google/callback",
  },
  prisma: new PrismaClient(),
};

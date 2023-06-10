import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();

export const DBconstants = {
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT!) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  prisma: new PrismaClient()
};

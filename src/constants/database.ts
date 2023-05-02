import { PrismaClient} from "@prisma/client";

export const DBconstants = {
  database: {
    host: "localhost",
    port: 3306,
  },
  prisma: new PrismaClient(),
};



import express from "express";
import passport from "passport";
import session from "express-session";
import morgan from "morgan";
import { serverConstants as constants } from "./constants/server";
import authRoute from "./application/Auth/routes/auth.route";
import clientRoute from "./application/Clients/routes/client.route";
import workerRoute from "./application/Worker/routes/worker.route";
import AdminRoute from "./application/Admin/routes/admin.route";
import serviceRoute from "./application/Services/routes/services.route";
import googleStrategy from "./utils/strategies/google.strategy";
import jwtStrategy from "./utils/strategies/jwt.strategy";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import path from "path";
import moment from "moment-timezone";

const app = express();
const swaggerPath = path.join(
  process.cwd(),
  "src",
  "utils",
  "documentation",
  "swagger.json"
);

const swaggerOptions = {
  customSiteTitle: "Cameya API",
  customfavIcon: constants.icon,
};

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(require(swaggerPath), swaggerOptions)
);

// Morgan config
const customFormatMorgan = ":time :method :url :status :response-time ms";
morgan.token("time", () => {
  return moment().tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss");
});
app.use(morgan(customFormatMorgan));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuración de CORS
const corsOptions = {
  origin: "*", // Reemplazar con dominio en producción
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: constants.session.secret,
    resave: false,
    saveUninitialized: false,
  })
);

// Se inicializa passport
app.use(passport.initialize());

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});

// Estrategia de autenticación de Google
passport.use(googleStrategy);

// Estrategia de autenticación con JWT
passport.use(jwtStrategy);

// Rutas de la aplicación
app.use("/auth", authRoute);
app.use("/api/user", clientRoute);
app.use("/api/worker", workerRoute);
app.use("/api/service", serviceRoute);
app.use("/admin", AdminRoute)

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.listen(constants.port, () => {
  console.log(`Server running on port ${constants.port}`);
});

import express from "express";
import passport from "passport";
import session from "express-session";
import { serverConstants as constants } from "./constants/server";
import authRoute from "./application/Auth/routes/auth.route";
import googleStrategy from "./application/Auth/strategies/google.strategy";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: constants.session.secret,
    resave: false,
    saveUninitialized: false,
  })
);

// Se inicializa passport
app.use(passport.initialize());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

// Estrategia de autenticación de Google
passport.use(googleStrategy);

// Rutas de la aplicación
app.use("/auth", authRoute);

app.listen(constants.port, () => {
  console.log(`Server running on port ${constants.port}`);
});

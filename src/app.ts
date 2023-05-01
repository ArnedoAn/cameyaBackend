import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { constants } from "./constants/constants";

const app = express();

import session from "express-session";

app.use(
  session({
    secret: "my-secret-key", // Cambia esto por una clave secreta real
    resave: false,
    saveUninitialized: false,
  })
);

// Configura la estrategia de autenticación de Google
passport.use(
  new GoogleStrategy(
    {
      clientID: constants.google.clientID,
      clientSecret: constants.google.clientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Aquí puedes manejar la información del usuario autenticado
      done(null, profile);
    }
  )
);

// Configura la serialización y deserialización del usuario
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

// Configura las rutas de autenticación
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Si el usuario se autentica correctamente, redirecciona a la página de inicio
    //const { displayName, emails } = req.user;
    res.redirect("/");
  }
);

app.get("/logout", (req, res) => {
  // Cierra la sesión del usuario y redirecciona a la página de inicio
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/", (req, res) => {
  // Si el usuario está autenticado, muestra su información

  res.send(`
            <h1>Información del usuario</h1>
            <ul>
                <li>Nombre: ${req.user}</li>
                <li><a href="/logout">Cerrar sesión</a></li>
            </ul>
        `);
});

app.listen(constants.port, () => {
  console.log(`Server running on port ${constants.port}`);
});

function next(err: any): void {
  throw new Error("Function not implemented.");
}

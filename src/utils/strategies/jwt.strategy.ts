import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import { servicesConstanst } from "../../constants/services";

const secretKey = servicesConstanst.jwtSecret;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "tu_clave_secreta", // Reemplaza con tu clave secreta para JWT
};

const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  try {
    jwt.verify(jwtPayload, secretKey as string ); // Verificar el token con la clave secreta
    done(null, true); // Autenticación exitosa, permitir acceso al endpoint
  } catch (err) {
    done(null, false, { message: "Acceso no autorizado" }); // Acceso no autorizado, mensaje personalizado
  }
});

export default jwtStrategy;

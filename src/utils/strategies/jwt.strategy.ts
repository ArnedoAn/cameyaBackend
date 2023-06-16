import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { servicesConstanst } from "../../constants/services";
import userController from "../../data/controllers/database/User.controller";

const secretKey = servicesConstanst.jwtSecret;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey, // Reemplaza con tu clave secreta para JWT
};

interface JwtPayload {
  email: string;
  password: string;
  iat: number;
}

const verifyCallback = async (jwtPayload: JwtPayload, done: any) => {
  try {
    const user = await userController.getUserByEmail(jwtPayload.email);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    return done(err);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, verifyCallback);

export default jwtStrategy;

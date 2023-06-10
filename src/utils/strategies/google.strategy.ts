import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { authConstants as constants } from "../../constants/auth";
import RegisterServices from "../../application/Auth/services/register.service";

const googleStrategy = new GoogleStrategy(
  {
    clientID: constants.google.clientID,
    clientSecret: constants.google.clientSecret,
    callbackURL: "/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    const response = await RegisterServices.isRegistered(
      profile._json.email as string
    );

    console.log(response);

    if (response === false) {
      console.log("User not registered");
      done(null, profile);
    } else {
      console.log("User registered");
      done(null, false);
    }
  }
);

export default googleStrategy;

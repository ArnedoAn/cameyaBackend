import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { authConstants as constants } from "../../../constants/auth";

const googleStrategy = new GoogleStrategy(
  {
    clientID: constants.google.clientID,
    clientSecret: constants.google.clientSecret,
    callbackURL: "/auth/google/callback",
  },
  (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  }
);

export default googleStrategy;

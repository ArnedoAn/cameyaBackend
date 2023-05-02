import * as GoogleKeys from "../../keys.json";

export const authConstants = {
  jwt: {},
  google: {
    clientID: GoogleKeys.web.client_id,
    clientSecret: GoogleKeys.web.client_secret,
    callbackURL: "/auth/google/callback",
  },
};

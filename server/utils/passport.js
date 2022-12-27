import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import db from "../database/connection.js";
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

passport.use(
  new Strategy(opts, async function (jwt_payload, done) {
    const [user, _] = await db.execute(
      "SELECT * FROM users WHERE id=? AND mail=?",
      [jwt_payload.id, jwt_payload.mail]
    );
    if (!user) {
      return done(null, false);
    } else {
      return done(null, user[0]);
    }
  })
);

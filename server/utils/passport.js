import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import db from "../database/connection.js";
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCES_TOKEN_SECRET;

passport.use(
  new Strategy(opts, async function (jwt_payload, done) {
    const [user, _] = await db.execute(
      "SELECT * FROM users WHERE id=?",
      [jwt_payload.id]
    );
    if (!user) {
      return done(null, false);
    } else {
      return done(null, user[0]);
    }
  })
);

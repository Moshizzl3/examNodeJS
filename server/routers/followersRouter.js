import { Router } from "express";
import db from "../database/connection.js";
import passport from "passport";
import "../utils/passport.js";

const router = Router();
router.use(passport.initialize());

router.get(
  "/followers",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let [followers, _] = await db.execute(
        "SELECT a.following_user_id, a.user_id, a.followed_on, b.first_name, b.last_name, b.profile_image_url FROM followers a INNER JOIN users b ON a.following_user_id = b.id WHERE user_id = ?",
        [req.user.id]
      );
      return res.status(200).send({ data: followers });
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

router.get(
  "/followers/following",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let [followers, _] = await db.execute(
        "SELECT a.following_user_id, a.user_id, a.followed_on, b.first_name, b.last_name, b.profile_image_url FROM followers a INNER JOIN users b ON a.user_id = b.id WHERE following_user_id  = ?",
        [req.user.id]
      );
      return res.send({ data: followers });
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

router.post(
  "/followers",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await db.execute(
        "INSERT INTO followers(user_id, followed_on, following_user_id) values(?,?,?)",
        [
          req.user.id,
          new Date().toISOString().slice(0, 19).replace("T", " "),
          req.body.followingId,
        ]
      );
      return res.status(200);
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

export default router;

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
    let [followers, _] = await db.execute(
      "SELECT a.following_user_id, b.first_name, b.last_name, b.profile_image_url FROM followers a INNER JOIN users b ON a.following_user_id = b.id WHERE user_id = ?",
      [req.user.id]
    );
    res.send({ data: followers });
  }
);

router.post(
  "/followers",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await db.execute(
      "INSERT INTO followers(user_id, following_user_id) values(?,?)",[req.user.id, req.body.followingId]
    );
  }
);



export default router;

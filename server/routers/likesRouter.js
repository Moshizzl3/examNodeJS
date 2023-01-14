import { Router } from "express";
import passport from "passport";
import db from "../database/connection.js";
import "../utils/passport.js";

const router = Router();
router.use(passport.initialize());

router.get(
  "/likes/post/count/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const [rows, _] = await db.execute(
      `SELECT COUNT(*) as like_count from likes where posts_id = ?`,
      [req.params.id]
    );

    res.status(200).send({ data: rows[0].like_count });
  }
);

router.get(
  "/likes/post/status/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const [rows, _] = await db.execute(
      `SELECT * FROM likes WHERE posts_id = ? AND user_id = ?`,
      [req.params.id, req.user.id]
    );
    res.status(200).send({ data: rows[0]?.id });
  }
);

router.post(
  "/likes/post",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const response = await db.execute(
      `INSERT INTO likes (like_amount, created_on, user_id, posts_id, comments_id) VALUES(?,?,?,?,?)`,
      [
        1,
        new Date().toISOString().slice(0, 19).replace("T", " "),
        req.user.id,
        req.body.postId,
        req.body.commentId,
      ]
    );

    req.io.emmit("liked-status", "Mo", "mo");

    res.status(200).send({ data: response[0].insertId });
  }
);

router.delete(
  "/likes/post/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await db.execute("DELETE FROM likes WHERE id = ?", [req.params.id]);

    res.status(200).send("ok");
  }
);

export default router;

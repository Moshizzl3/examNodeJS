import { Router } from "express";
import passport from "passport";
import db from "../database/connection.js";
import "../utils/passport.js";

const router = Router();
router.use(passport.initialize());

router.get(
  "/post/count/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const [rows, _] = await db.execute(
        `SELECT COUNT(*) as like_count from likes where posts_id = ?`,
        [req.params.id]
      );
      return res.status(200).send({ data: rows[0].like_count });
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

router.get(
  "/post",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const [rows, _] = await db.execute(
        `SELECT a.id, c.profile_image_url, a.created_on, a.posts_id, a.user_id, 
        c.first_name AS like_user, b.user_id as post_user_id, d.first_name AS post_user
        FROM likes a
        INNER JOIN posts b on a.posts_id = b.id
        INNER JOIN users c on a.user_id=c.id
        INNER JOIN users d on b.user_id=d.id
        ORDER BY created_on DESC
        LIMIT 5
        `
      );
      return res.status(200).send({ data: rows });
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

router.get(
  "/post/status/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const [rows, _] = await db.execute(
        `SELECT * FROM likes WHERE posts_id = ? AND user_id = ?`,
        [req.params.id, req.user.id]
      );
      return res.status(200).send({ data: rows[0]?.id });
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
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

      const [likeInfo, _] = await db.execute(
        `SELECT a.id, a.created_on, a.posts_id, b.id, a.user_id, c.first_name AS like_user, b.user_id, d.first_name AS post_user
        FROM likes a
        INNER JOIN posts b on a.posts_id = b.id
        INNER JOIN users c on a.user_id=c.id
        INNER JOIN users d on b.user_id=d.id
        where a.id =?
        ORDER BY created_on DESC
        `,
        [response[0].insertId]
      );
      return res.status(200).send({
        data: { likeId: response[0].insertId, likeInfo: likeInfo[0] },
      });
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

router.delete(
  "/post/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await db.execute("DELETE FROM likes WHERE id = ?", [req.params.id]);

      return res.status(200).send("ok");
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

export default router;

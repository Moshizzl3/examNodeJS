import { Router } from "express";
import passport from "passport";
import db from "../database/connection.js";
import "../utils/passport.js";

const router = Router();

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const [posts, _] = await db.execute(
        "SELECT a.id,a.text,a.created_on,a.user_id,a.image_url, b.first_name, b.profile_image_url FROM posts a INNER JOIN users b ON a.user_id=b.id WHERE user_id = ? ORDER BY created_on DESC",
        [req.user.id]
      );
      return res.status(200).send({
        succes: true,
        data: posts,
      });
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

router.get(
  "/posts/user/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const [posts, _] = await db.execute(
        "SELECT a.id,a.text,a.created_on,a.user_id,a.image_url, b.first_name, b.profile_image_url FROM posts a INNER JOIN users b ON a.user_id=b.id WHERE user_id = ? ORDER BY created_on DESC",
        [req.params.id]
      );
      return res.status(200).send({
        succes: true,
        data: posts,
      });
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const response = await db.execute(
        `INSERT INTO posts(text, created_on, image_url, user_id) VALUES(?,?,?,?)`,
        [
          req.body.text,
          new Date().toISOString().slice(0, 19).replace("T", " "),
          req.body.imageUrl || null,
          req.user.id,
        ]
      );
      return res.status(200).send({
        succes: true,
      });
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

router.post(
  "/posts/search",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const blacklistedWords = ["and", "then", "or"];
      const whiteListedChars = /[^A-Za-z0-9-|]/g;
      let searchParameters = req.body.searchParameters.split(" ");
      searchParameters = searchParameters
        .filter((word) => !blacklistedWords.includes(word))
        .map((word) => word + "|")
        .toString()
        .replace(whiteListedChars, "")
        .slice(0, -1);

      const [result, _] = await db.execute(
        "SELECT a.id,a.text,a.created_on,a.user_id,a.image_url, b.first_name, b.profile_image_url FROM posts a INNER JOIN users b ON a.user_id=b.id WHERE text REGEXP ? ORDER BY created_on DESC",
        [searchParameters]
      );
      console.log(searchParameters);
      console.log(result);
      return res.send({ data: result });
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

export default router;

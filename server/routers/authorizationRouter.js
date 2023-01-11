import Router from "express";
import passport from "passport";
import db from "../database/connection.js";
import "../utils/passport.js";
import path from "path";

const router = Router();

router.use(passport.initialize());

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const [posts, _] = await db.execute(
      "SELECT a.id,a.text,a.created_on,a.user_id,a.image_url, b.first_name FROM posts a INNER JOIN users b ON a.user_id=b.id WHERE user_id = ? ORDER BY created_on DESC",
      [req.user.id]
    );
    res.status(200).send({
      succes: true,
      data: posts,
    });
  }

  //query to db to get all posts on user
);

router.get("/posts/image", function (req, res) {
  res.sendFile(path.resolve("./public/images/mo.jpeg"));
});

router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req.body);
    const response = await db.execute(
      `INSERT INTO posts(text, created_on, image_url, user_id) VALUES(?,?,?,?)`,
      [
        req.body.text,
        new Date().toISOString().slice(0, 19).replace("T", " "),
        "/img/test.jpg",
        req.user.id,
      ]
    );
    console.log(response);
    res.status(200).send({
      succes: true,
    });
  }

  //query to db to get all posts on user
);

export default router;

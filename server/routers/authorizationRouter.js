import Router from "express";
import passport from "passport";
import db from "../database/connection.js";
import "../utils/passport.js";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const router = Router();
router.use(passport.initialize());

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const [posts, _] = await db.execute(
      "SELECT a.id,a.text,a.created_on,a.user_id,a.image_url, b.first_name, b.profile_image_url FROM posts a INNER JOIN users b ON a.user_id=b.id WHERE user_id = ? ORDER BY created_on DESC",
      [req.user.id]
    );
    res.status(200).send({
      succes: true,
      data: posts,
    });
  }

  //query to db to get all posts on user
);

router.get("/posts/image/:imageUrl", function (req, res) {
  res.sendFile(path.resolve(`./public/images/${req.params.imageUrl}`));
});

router.get(
  "/users/profile-image",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.sendFile(path.resolve(`./public/images/${req.user.profile_image_url}`));
  }
);

router.get(
  "/users/cover-image",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.sendFile(path.resolve(`./public/images/${req.user.cover_image_url}`));
  }
);
router.get(
  "/users/images/:name",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.sendFile(path.resolve(`./public/images/${req.params.name}`));
  }
);

router.post(
  "/posts/search",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
    res.send({ data: result });
  }
);

router.post(
  "/users/search",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
      "SELECT id, first_name, last_name, profile_image_url FROM users WHERE first_name REGEXP ?  ORDER BY first_name",
      [searchParameters]
    );
    
    res.send({ data: result });
  }
);

router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const response = await db.execute(
      `INSERT INTO posts(text, created_on, image_url, user_id) VALUES(?,?,?,?)`,
      [
        req.body.text,
        new Date().toISOString().slice(0, 19).replace("T", " "),
        req.body.imageUrl || null,
        req.user.id,
      ]
    );
    res.status(200).send({
      succes: true,
    });
  }
);

router.post("/upload_image", upload.array("files"), (req, res) => {
  try {
    res.status(200).send({ data: req.files[0].filename });
  } catch {
    res.status(400);
  }
});

router.get(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send({ data: req.user.first_name });
  }
);

export default router;

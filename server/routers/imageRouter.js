import Router from "express";
import passport from "passport";
import db from "../database/connection.js";
import "./middleware/passport.js";
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
  "/profile-image",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    return res.sendFile(
      path.resolve(`./public/images/${req.user.profile_image_url}`)
    );
  }
);
router.get(
  "/profile-image/follower/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const [rows, _] = await db.execute("SELECT * FROM users WHERE id=?", [
        req.params.id,
      ]);
      console.log(req.params.id);
      return res.sendFile(
        path.resolve(`./public/images/${rows[0].profile_image_url}`)
      );
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

router.get(
  "/cover-image",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    return res.sendFile(
      path.resolve(`./public/images/${req.user.cover_image_url}`)
    );
  }
);

router.get(
  "/cover-image/follower/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const [rows, _] = await db.execute("SELECT * FROM users WHERE id=?", [
        req.params.id,
      ]);
      return res.sendFile(
        path.resolve(`./public/images/${rows[0].cover_image_url}`)
      );
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);
router.get(
  "/img-name/:imgUrl",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    return res.sendFile(path.resolve(`./public/images/${req.params.imgUrl}`));
  }
);

router.post("/upload_image", upload.array("files"), (req, res) => {
  try {
    return res.status(200).send({ data: req.files[0].filename });
  } catch {
    return res.status(400);
  }
});

export default router;

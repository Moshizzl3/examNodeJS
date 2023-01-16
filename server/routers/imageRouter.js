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




router.post("/upload_image", upload.array("files"), (req, res) => {
  try {
    res.status(200).send({ data: req.files[0].filename });
  } catch {
    res.status(400);
  }
});



export default router;

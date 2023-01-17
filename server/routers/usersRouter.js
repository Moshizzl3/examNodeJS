import Router from "express";
import db from "../database/connection.js";
import bcrypt from "bcrypt";
import passport from "passport";
import "../middleware/passport.js";
import { validate, signupValidationRules } from "../middleware/validation.js";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const [rows, col] = await db.execute("SELECT * FROM users WHERE id = ?", [
        req.user.id,
      ]);

      const user = {
        id: rows[0].id,
        firstName: rows[0].first_name,
        lastName: rows[0].last_name,
        mail: rows[0].mail,
        profileImageUrl: rows[0].profile_image_url,
        coverImageUrl: rows[0].cover_image_url,
      };
      return res.status(200).send({ data: user });
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);
router.get(
  "/name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).send({ data: req.user.first_name });
  }
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const [rows, col] = await db.execute("SELECT * from users WHERE id = ?", [
        req.params.id,
      ]);

      const user = {
        id: rows[0].id,
        firstName: rows[0].first_name,
        lastName: rows[0].last_name,
        mail: rows[0].mail,
        profileImageUrl: rows[0].profile_image_url,
        coverImageUrl: rows[0].cover_image_url,
      };

      return res.status(200).send({ data: user });
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

router.get("/mail/:mail", async (req, res) => {
  try {
    const [rows, columns] = await db.execute(
      "SELECT * FROM users WHERE mail=?",
      [req.params.mail]
    );
    if (rows[0]) {
      return res.status(200).send({
        data: { id: rows[0].id, mail: rows[0].mail, name: rows[0].first_name },
      });
    } else return res.status(404).send({ message: "No such mail" });
  } catch (err) {
    return res.status(400).send({ data: err });
  }
});

router.post("/", signupValidationRules(), validate, async (req, res) => {
  console.log(req.body);
  const user = { ...req.body };
  const saltRounds = 12;
  user.password1 = await bcrypt.hash(user.password1, saltRounds);
  try {
    await db.execute(
      "INSERT INTO users(first_name, last_name, mail, password) VALUES(?, ?, ?, ?);",
      [user.firstName, user.lastName, user.mail, user.password1]
    );
    return res.status(200).send({ data: "ok" });
  } catch (err) {
    return res.status(400).send({ data: err });
  }
});

router.post(
  "/search",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req.body);
    const blacklistedWords = ["and", "then", "or"];
    const whiteListedChars = /[^A-Za-z0-9-|]/g;
    let searchParameters = req.body.searchParameters.split(" ");
    searchParameters = searchParameters
      .filter((word) => !blacklistedWords.includes(word))
      .map((word) => word + "|")
      .toString()
      .replace(whiteListedChars, "")
      .slice(0, -1);

    try {
      const [result, _] = await db.execute(
        "SELECT id, first_name, last_name, profile_image_url FROM users WHERE first_name REGEXP ?  ORDER BY first_name",
        [searchParameters]
      );
      return res.status(200).send({ data: result });
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await db.execute(
        "UPDATE users SET first_name = ?, last_name = ?, mail = ?, profile_image_url=?, cover_image_url=? WHERE id = ?",
        [
          req.body.firstName,
          req.body.lastName,
          req.body.mail,
          req.body.profileImageUrl,
          req.body.coverImageUrl,
          req.user.id,
        ]
      );
      return res.status(200).send("ok");
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

router.patch(
  "/password",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = { ...req.body };
      const saltRounds = 12;
      user.password = await bcrypt.hash(user.password, saltRounds);

      await db.execute("UPDATE users SET password = ? WHERE id = ?", [
        user.password,
        req.user.id,
      ]);

      return res.status(200).send("ok");
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await db.execute("DELETE FROM users WHERE id=?", [req.user.id]);
      return res.status(200).send("ok");
    } catch (err) {
      return res.status(400).send({ data: err });
    }
  }
);

export default router;

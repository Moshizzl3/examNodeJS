import Router from "express";
import db from "../database/connection.js";
import bcrypt from "bcrypt";
import passport from "passport";
import "../utils/passport.js";

const router = Router();

router.get(
  "/api/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const [rows, col] = await db.execute("SELECT * from users WHERE id = ?", [
      req.user.id,
    ]);

    const user = {
      firstName: rows[0].first_name,
      lastName: rows[0].last_name,
      mail: rows[0].mail,
      profileImageUrl: rows[0].profile_image_url,
      coverImageUrl: rows[0].cover_image_url,
    };

    res.status(200).send({ data: user });
  }
);
router.get(
  "/api/users/name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send({ data: req.user.first_name });
  }
);
router.get(
  "/api/users/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const [rows, col] = await db.execute("SELECT * from users WHERE id = ?", [
      req.params.id,
    ]);

    const user = {
      firstName: rows[0].first_name,
      lastName: rows[0].last_name,
      mail: rows[0].mail,
      profileImageUrl: rows[0].profile_image_url,
      coverImageUrl: rows[0].cover_image_url,
    };

    res.status(200).send({ data: user });
  }
);

router.get("/api/users/:mail", async (req, res) => {
  const [rows, columns] = await db.execute("SELECT * FROM users WHERE mail=?", [
    req.params.mail,
  ]);

  if (rows[0]) {
    return res.status(200).send({
      data: { id: rows[0].id, mail: rows[0].mail, name: rows[0].first_name },
    });
  } else return res.status(404).send({ mesaage: "no" });
});



router.post("/api/users", async (req, res) => {
  const user = { ...req.body };
  const saltRounds = 12;

  user.password = await bcrypt.hash(user.password, saltRounds);
  await db.execute(
    "INSERT INTO users(first_name, last_name, mail, password) VALUES(?, ?, ?, ?);",
    [user.firstName, user.lastName, user.mail, user.password]
  );
  res.status(200).send({ data: "ok" });
});

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

router.patch(
  "/api/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
    res.status(200).send("ok");
  }
);

router.patch(
  "/api/users/password",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = { ...req.body };
    const saltRounds = 12;
    user.password = await bcrypt.hash(user.password, saltRounds);

    await db.execute("UPDATE users SET password = ? WHERE id = ?", [
      user.password,
      req.user.id,
    ]);

    res.status(200).send("ok");
  }
);

router.delete(
  "/api/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await db.execute("DELETE FROM users WHERE id=?", [req.user.id]);
    res.status(200).send("ok");
  }
);

export default router;

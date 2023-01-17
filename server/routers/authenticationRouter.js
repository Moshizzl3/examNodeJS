import Router from "express";
import db from "../database/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const [user, _] = await db.execute("SELECT * FROM users WHERE mail=?", [
      req.body.mail,
    ]);

    if (!user[0]) {
      return res.status(401).send({
        succes: false,
        message: "No user found",
      });
    }
    if (!(await bcrypt.compare(req.body.password, user[0].password))) {
      return res.status(401).send({
        succes: false,
        message: "wrong password",
      });
    }

    const payload = {
      id: user[0].id,
    };

    const token = jwt.sign(payload, process.env.ACCES_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      succes: true,
      message: "logged in succesfully",
      token: "Bearer " + token,
    });
  } catch (err) {
    return res.status(400).send({ data: err });
  }
});

export default router;

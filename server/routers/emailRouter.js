import { Router } from "express";
import passport from "passport";
import { sendMail } from "../utils/emailGenerator.js";
import jwt from "jsonwebtoken";
import "../middleware/passport.js";

const router = Router();

router.get(
  "/token",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    }
    return res.status(200).send({ data: req.user.mail });
  }
);

router.post("/forgot", async (req, res) => {
  const user = req.body.data;
  const mail = await sendMail(
    user,
    jwt.sign(user, process.env.ACCES_TOKEN_SECRET, { expiresIn: "5m" })
  );
  return res.status(200).send({ data: mail });

});

export default router;

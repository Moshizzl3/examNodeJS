import { Router } from "express";
import passport from "passport";
import { sendMail } from "../utils/emailGenerator.js";
import jwt from "jsonwebtoken";
import "../utils/passport.js";

const router = Router();

router.post("/mail/forgot", (req, res) => {
  const user = req.body.data;
  sendMail(user, jwt.sign(user, process.env.ACCES_TOKEN_SECRET, { expiresIn: "5m" }))
    .then((mail) => {
      res.status(200).send({ data: mail });
    })
    .catch((err) => {
      res.status(404).send({ data: err });
    });
});

router.get(
  "/api/mail/token",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.sendStatus(401);
    }
    return res.status(200).send({ data: req.user.mail });
  }
);


export default router;

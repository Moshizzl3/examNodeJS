import Router from "express";
import passport from "passport";
import "../utils/passport.js"

const router = Router();

router.use(passport.initialize())

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send({
      succes: true,
      user: {
        id: req.user.id,
        mail: req.user.mail,
        role: req.user.role_id,
      },
    });
  }
);

export default router;

import Router from "express";
import db from "../database/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();


router.post("/api/login", async (req, res) => {
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
      name: user[0].first_name + " " + user[0].last_name,
      mail: user[0].mail,
      role: user[0].role_id
    };
  
    console.log(payload);
  
    const token = jwt.sign(payload, "secret", { expiresIn: "1d" });
  
    res.status(200).send({
      succes: true,
      message: "logged in succesfully",
      token: "Bearer " + token,
    });
  });
  
  export default router;
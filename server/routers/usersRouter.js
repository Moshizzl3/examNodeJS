import Router from "express";
import db from "../database/connection.js";
import bcrypt from "bcrypt";


const router = Router();





router.post("/api/users", async (req, res) => {
  const user = { ...req.body };
  const saltRounds = 12;

  user.password = await bcrypt.hash(user.password, saltRounds);
  await db.execute(
    "INSERT INTO users(first_name, last_name, mail, password, role_id) VALUES(?, ?, ?, ?, ?);",
    [user.firstName, user.lastName, user.mail, user.password, 1]
  );
  res.status(200).send({ data: "ok" });
});


export default router;

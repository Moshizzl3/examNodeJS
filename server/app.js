import express from "express";
import userRouter from "./routers/usersRouter.js";
import authencationRouter from "./routers/authenticationRouter.js";
import authorizationRouter from "./routers/authorizationRouter.js";
import cors from "cors";

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(userRouter);
app.use(authencationRouter);
app.use(authorizationRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("app is now running on port:", PORT));

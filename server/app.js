import express from "express";
import userRouter from "./routers/usersRouter.js";
import cors from "cors";
const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("app is now running on port:", PORT));

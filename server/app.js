import express from "express";
import userRouter from "./routers/usersRouter.js";
import authencationRouter from "./routers/authenticationRouter.js";
import authorizationRouter from "./routers/authorizationRouter.js";
import followersRouter from "./routers/followersRouter.js";
import likesRouter from "./routers/likesRouter.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { credentials: true, origin: true },
});

app.use((req, res, next) => {
    req.io = io;
    return next();
  });
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(userRouter);
app.use(authencationRouter);
app.use(authorizationRouter);
app.use(followersRouter);
app.use(likesRouter);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log("app is now running on port:", PORT));

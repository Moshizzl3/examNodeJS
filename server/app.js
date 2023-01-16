import express from "express";
import userRouter from "./routers/usersRouter.js";
import authencationRouter from "./routers/authenticationRouter.js";
import authorizationRouter from "./routers/authorizationRouter.js";
import emailRouter from "./routers/emailRouter.js";
import followersRouter from "./routers/followersRouter.js";
import socketioJwt from "socketio-jwt";
import likesRouter from "./routers/likesRouter.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import passport from "passport";
import "./utils/passport.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { credentials: true, origin: true },
});

app.set('socketio', io);

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(userRouter);
app.use(authencationRouter);
app.use(authorizationRouter);
app.use(followersRouter);
app.use(likesRouter);
app.use(emailRouter);

const PORT = process.env.PORT || 3000;

io.use(
  socketioJwt.authorize({
    secret: "secret",
    handshake: true,
    auth_header_required: true,
  })
);

io.on("connection", (socket) => {
  console.log(`A socket connected on id ${socket.id}`);

  socket.on(
    "like",
    (data) => {
      socket.broadcast.emit("notification", data);
    }
  );

  io.on("disconnect", () => {
    console.log(`Socket ${socket.id} left.`);
  });
});

server.listen(PORT, () => console.log("app is now running on port:", PORT));

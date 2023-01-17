import express from "express";
import userRouter from "./routers/usersRouter.js";
import authencationRouter from "./routers/authenticationRouter.js";
import imageRouter from "./routers/imageRouter.js";
import emailRouter from "./routers/emailRouter.js";
import followersRouter from "./routers/followersRouter.js";
import postsRouter from "./routers/postsRouter.js";
import helmet from "helmet";
import likesRouter from "./routers/likesRouter.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import passport from "passport";
import "./middleware/passport.js";

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { credentials: true, origin: true },
  autoconnect: true,
});
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/users", userRouter);
app.use("/api/authenticate", authencationRouter);
app.use("/api/images", imageRouter);
app.use("/api/followers", followersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/likes", likesRouter);
app.use("/api/mail",emailRouter);

const wrapMiddlewareForSocketIo = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

io.use(wrapMiddlewareForSocketIo(passport.initialize()));
io.use(
  wrapMiddlewareForSocketIo(passport.authenticate(["jwt"], { session: false }))
);

io.on("connection", (socket) => {
  console.log(`A socket connected on id ${socket.id}`);

  socket.on("like", (data) => {
    socket.broadcast.emit("notification", data);
  });

  io.on("disconnect", () => {
    console.log(`Socket ${socket.id} left.`);
  });
});

server.listen(PORT, () => console.log("app is now running on port:", PORT));

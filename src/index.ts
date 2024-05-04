import express from "express";
import http from "http";
import { Server as ServerIO } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// routes import
import authRoute from "./Routes/auth";
import analyticsRoute from "./Routes/analytics";
import activityRoute from "./Routes/activity";
import { User } from "@prisma/client";
import { deleteUserSession } from "../src/helpers/session";

dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["POST,GET,PUT,DELETE"],
    credentials: true,
  })
);

const io = new ServerIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["POST,GET,PUT,DELETE"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("dev"));

// route for authentication like register login and logout
app.use("/auth", authRoute);

// route for viewing user analytics need authentication
app.use("/analytics", analyticsRoute);

app.use("/activity", activityRoute);

io.on("connect", (socket) => {
  console.log(socket?.id, "a user connnected");

  socket.on("logoutAll", async (user: User) => {
    const isDeleted = await deleteUserSession(user?.id);
    io?.emit(user?.id, !!isDeleted);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

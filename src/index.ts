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
import {
  deleteSingleSession,
  deleteUserSession,
  getSessionById,
} from "./helpers/session";
import sessionRoute from "./Routes/session-route";
import { createAuditLog } from "./helpers/audit";
import db from "./lib/db";

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

app.use("/session", sessionRoute);

// socket io
io.on("connect", (socket) => {
  console.log(socket?.id, "a user connnected");

  socket.on("logoutAll", async (user: User) => {
    const isDeleted = await deleteUserSession(user?.id);
    if (isDeleted) {
      io?.emit(user?.id, !!isDeleted);
    }
  });

  socket?.on("sessionLogout", async (sessionId: string) => {
    const sessionData = await deleteSingleSession(sessionId);
    if (sessionData?.id) {
      await createAuditLog({
        type: "LOGIN",
        userAgent: sessionData?.userAgent,
        userId: sessionData?.userId,
      });

      io?.emit(sessionData?.id, !!sessionData);
    }
  });

  socket?.on(
    "restrictDevice",
    async ({ id, isRestricted }: { id: string; isRestricted: boolean }) => {
      const session = await getSessionById(id);

      if (session && session?.id) {
        await db?.session?.update({
          where: {
            id: session?.id,
          },
          data: {
            isRestricted,
          },
        });

        io?.emit(`${session?.id}34545`, !!session);
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// routes import
import authRoute from "./Routes/auth";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(morgan("dev"));

// route for authentication like register login and logout
app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

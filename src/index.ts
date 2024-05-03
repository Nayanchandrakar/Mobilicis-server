import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// routes import
import authRoute from "./Routes/auth";
import analyticsRoute from "./Routes/analytics";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: "POST,GET,PUT,DELETE",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("dev"));

// route for authentication like register login and logout
app.use("/auth", authRoute);

app.use("/analytics", analyticsRoute);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

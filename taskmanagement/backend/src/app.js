import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {sendEmail} from "./utils/sendEmail.js"; // adjust the path if needed

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Cron job: automatically runs on import
import "./schedulers/reminderCron.js";

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// Routes
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);


app.get("/test-email", async (req, res) => {
  try {
    await sendEmail("hhell2886@gmail.com", "Test message from /test-email");
    res.send("Email sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send email");
  }
});



export default app;

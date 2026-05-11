
import { errorMiddleware } from "@/middlewares/error.js"
import cors from 'cors'
import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import { config } from "./config/index.js"
import { appRouter } from "./routes/index.js"

export const app = express();

// security middleware
app.use(
  helmet({
    contentSecurityPolicy: config.NODE_ENV !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: config.NODE_ENV !== "DEVELOPMENT",
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [config.ACCESS_ORIGIN],
  credentials: true
}));
app.use(morgan('dev'));

// Health cheack
app.get('/', (req, res) => {
  res.send('Server is up!');
});

//  routes 
app.use("/api/v1", appRouter);

app.get("/*splat", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

// Global error catch
app.use(errorMiddleware);


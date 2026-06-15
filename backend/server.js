import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";


import { v2 as cloudinary } from "cloudinary";


import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import connectMongoDB from "./db/connectMongoDB.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";

dotenv.config({ path: path.resolve("./.env") });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, 
})

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

if (process.env.NODE_ENV === "production" || (process.env.NODE_ENV !== "development" && fs.existsSync(path.join(rootDir, "frontend/dist")))) {
	app.use(express.static(path.join(rootDir, "frontend/dist")));

	app.get("*all", (req, res) => {
		res.sendFile(path.resolve(rootDir, "frontend", "dist", "index.html"));
	});
}

// Start server
const startServer = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();
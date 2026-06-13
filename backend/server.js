import express from "express";

import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("./.env") });

console.log("MONGO:", process.env.MONGO_URI);


const app = express();
const PORT = process.env.PORT || 5000;



await connectMongoDB();

app.use("/api/auth",authRoutes);





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

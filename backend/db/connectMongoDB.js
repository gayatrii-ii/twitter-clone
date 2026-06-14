import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    console.log("MONGO:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectMongoDB;
import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/ai-interviewer";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

let isConnected = false;

export default async function connectDB() {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return mongoose.connection.db;
  }

  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, options);
    isConnected = true;
    console.log("MongoDB connected successfully");
    return mongoose.connection.db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

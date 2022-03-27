import mongoose from "mongoose";
import config from "config";

const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      useNewUrlParser: true,
    });
    console.log("MongoDB Connected...");
  } catch (e) {
    console.error(`Message: ${e.message}`);
    console.error(`Stack Trace: ${e.stack}"`);
    process.exit(1);
  }
};

export default connectDB;

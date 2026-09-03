import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('db connected');
    
  } catch (error) {
    console.log('Error Mongo',error);
    process.exit(1) // 1 status means fails, 0 means success
  }
};

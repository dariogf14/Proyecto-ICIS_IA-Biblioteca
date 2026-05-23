import mongoose from "mongoose";

export async function connectMongo() {
  // conexion a MongoDB
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
}

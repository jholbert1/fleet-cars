import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    const dbHost = process.env.DB_HOST || "localhost";
    const dbPort = process.env.DB_PORT || "27017";
    const dbName = process.env.DB_NAME || "registro-carros";

    const uri = `mongodb://${dbHost}:${dbPort}/${dbName}`;

    const conn = await mongoose.connect(uri);
    console.log(
      `MongoDB conectado: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`
    );
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;

import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../database.js";
import UserModel from "../models/UserModel.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();

    const users = [
      {
        name: "Usuario Admin",
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", 10),
      },
      {
        name: "Usuario Normal",
        email: "user@example.com",
        password: await bcrypt.hash("user123", 10),
      },
    ];

    for (const userData of users) {
      const existingUser = await UserModel.findOne({ email: userData.email });
      if (!existingUser) {
        await UserModel.create(userData);
        console.log(`Usuario ${userData.email} creado exitosamente.`);
      } else {
        console.log(`Usuario ${userData.email} ya existe.`);
      }
    }

    console.log("Seeding de usuarios completado.");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error al hacer el seeding de usuarios:", error);
    process.exit(1);
  }
};

seedUsers();

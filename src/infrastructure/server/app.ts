// src/infrastructure/server/app.ts
import dotenv from "dotenv";
import express from "express";
import fleetRoutes from "../../interfaces/routes/FleetRoutes.js";
import vehicleRoutes from "../../interfaces/routes/VehicleRoutes.js";
import connectDB from "../database/database.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

app.use(express.json());

// Rutas
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/fleets", fleetRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

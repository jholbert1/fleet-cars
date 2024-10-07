import dotenv from "dotenv";
import mongoose from "mongoose";
import { FleetService } from "../../../aplication/services/FleetService.js";
import { FleetRepository } from "../../repositories/FleetRepository.js";
import connectDB from "../database.js";

dotenv.config();

const seedFleets = async () => {
  try {
    await connectDB();

    const fleetRepository = new FleetRepository();
    const fleetService = new FleetService(fleetRepository);

    const fleetsData = [
      { name: "Pickup / Camioneta" },
      { name: "Espectacular" },
      { name: "No tan caro" },
    ];

    for (const data of fleetsData) {
      const existingFleet = await fleetService.findByName(data.name);
      if (!existingFleet) {
        await fleetService.createFleet(data);
      }
    }

    console.log("Seeding de Fleet completado");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error al hacer el seeding de Fleet:", error);
    process.exit(1);
  }
};

seedFleets();

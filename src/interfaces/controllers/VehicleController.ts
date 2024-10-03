import { Request, Response } from "express";
import { VehicleRepository } from "../../infrastructure/repositories/VehicleRepository.js";
import { VehicleService } from "../../aplication/services/VehicleService.js";
const vehicleRepository = new VehicleRepository();
const vehicleService = new VehicleService(vehicleRepository);

export class VehicleController {
  static async createVehicle(req: Request, res: Response) {
    try {
      const { marca, modelo, año } = req.body;
      const vehicle = await vehicleService.createVehicle({
        marca,
        modelo,
        año,
      });
      res.status(201).json(vehicle);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async findAllVehicles(req: Request, res: Response) {
    try {
      const vehicles = await vehicleService.findAllVehicles();
      res.status(200).json(vehicles);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

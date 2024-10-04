import { Request, Response } from "express";
import { VehicleService } from "../../aplication/services/VehicleService.js";
import { PaginationOptions } from "../../domain/interfaces/PaginationOptions.js";
import { VehicleRepository } from "../../infrastructure/repositories/VehicleRepository.js";
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
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const paginationOptions: PaginationOptions = { page, limit };

      const { vehicles, total } = await vehicleService.findAllVehicles(
        paginationOptions
      );

      res.status(200).json({
        data: vehicles,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async findByFleet(req: Request, res: Response) {
    try {
      const { fleetId } = req.params;

      const vehicles = await vehicleService.findVehiclesByFleet(fleetId);
      res.status(200).json(vehicles);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

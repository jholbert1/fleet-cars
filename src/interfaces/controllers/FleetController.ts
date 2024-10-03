import { Request, Response } from "express";
import { FleetService } from "../../aplication/services/FleetService.js";
import { FleetRepository } from "../../infrastructure/repositories/FleetRepository.js";
const fleetRepository = new FleetRepository();
const fleetService = new FleetService(fleetRepository);

export class FleetController {
  static async createFleet(req: Request, res: Response) {
    try {
      const { nombre } = req.body;
      const vehicle = await fleetService.createFleet({ nombre });
      res.status(201).json(vehicle);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async findAllFleet(req: Request, res: Response) {
    try {
      const fleets = await fleetService.findAllFleets();
      res.status(200).json(fleets);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

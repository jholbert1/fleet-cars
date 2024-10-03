import { Fleet } from "../../domain/entities/Fleet.js";
import { IFleetRepository } from "../../domain/repositories/IFleetRepository.js";

export class FleetService {
  constructor(private fleetRepository: IFleetRepository) {}

  async createFleet(data: { nombre: string }): Promise<Fleet> {
    const vehicle = new Fleet(data.nombre);
    return await this.fleetRepository.create(vehicle);
  }

  async findAllFleets(): Promise<Fleet[]> {
    return await this.fleetRepository.findAll();
  }
}

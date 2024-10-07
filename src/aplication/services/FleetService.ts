import { Fleet } from "../../domain/entities/Fleet.js";
import { IFleetRepository } from "../../domain/repositories/IFleetRepository.js";

export class FleetService {
  constructor(private fleetRepository: IFleetRepository) {}

  async createFleet(data: { name: string }): Promise<Fleet> {
    const vehicle = new Fleet(data.name);
    return await this.fleetRepository.create(vehicle);
  }

  async findAllFleets(): Promise<Fleet[]> {
    return await this.fleetRepository.findAll();
  }

  async findByName(name: string): Promise<Fleet | null> {
    return await this.fleetRepository.findByName(name);
  }
}

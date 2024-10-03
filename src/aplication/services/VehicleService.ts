import { Vehicle } from "../../domain/entities/Vehicle.js";
import { IVehicleRepository } from "../../domain/repositories/IVehicleRepository.js";

export class VehicleService {
  constructor(private vehicleRepository: IVehicleRepository) {}

  async createVehicle(data: {
    marca: string;
    modelo: string;
    año: number;
  }): Promise<Vehicle> {
    const vehicle = new Vehicle(data.marca, data.modelo, data.año);
    return await this.vehicleRepository.create(vehicle);
  }

  async findAllVehicles(): Promise<Vehicle[]> {
    return await this.vehicleRepository.findAll();
  }
}

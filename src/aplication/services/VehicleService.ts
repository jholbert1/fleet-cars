import { Vehicle } from "../../domain/entities/Vehicle.js";
import { PaginationOptions } from "../../domain/interfaces/PaginationOptions.js";
import { IVehicleRepository } from "../../domain/repositories/IVehicleRepository.js";
import FleetModel from "../../infrastructure/database/models/FleetModel.js";

export class VehicleService {
  constructor(private vehicleRepository: IVehicleRepository) {}

  async createVehicle(data: {
    brand: string;
    carModel: string;
    year: number;
  }): Promise<Vehicle> {
    const fleetId = await this.assignFleetToVehicle(
      data.brand,
      data.carModel,
      data.year
    );

    const vehicle = new Vehicle(data.brand, data.carModel, data.year, fleetId);
    return await this.vehicleRepository.create(vehicle);
  }

  async findAllVehicles(
    paginationOptions: PaginationOptions
  ): Promise<{ vehicles: Vehicle[]; total: number }> {
    const vehicles = await this.vehicleRepository.findAll(paginationOptions);
    const total = await this.vehicleRepository.count();
    return { vehicles, total };
  }

  async findVehiclesByFleet(fleetId: string): Promise<Vehicle[]> {
    return await this.vehicleRepository.findByFleet(fleetId);
  }

  private async assignFleetToVehicle(
    brand: string,
    carModel: string,
    year: number
  ): Promise<string | null> {
    const rules = [
      {
        condition: (brand: string, carModel: string, year: number) =>
          brand === "Chevrolet" &&
          year >= 2018 &&
          ["Aveo", "Optra"].includes(carModel),
        fleetName: "Espectacular",
      },
      {
        condition: (brand: string, carModel: string, year: number) =>
          brand === "Toyota" &&
          year >= 2015 &&
          ["Hilux", "Fortunner", "Prado"].includes(carModel),
        fleetName: "Pickup / Camioneta",
      },
    ];

    for (const rule of rules) {
      if (rule.condition(brand, carModel, year)) {
        const fleet = await FleetModel.findOne({ name: rule.fleetName });
        return fleet?._id.toString() || null;
      }
    }

    const fleet = await FleetModel.findOne({ name: "Económico" });
    return fleet?._id.toString() || null;
  }
}

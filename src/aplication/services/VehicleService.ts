import { Vehicle } from "../../domain/entities/Vehicle.js";
import { PaginationOptions } from "../../domain/interfaces/PaginationOptions.js";
import { IVehicleRepository } from "../../domain/repositories/IVehicleRepository.js";
import FleetModel from "../../infrastructure/database/models/FleetModel.js";

export class VehicleService {
  constructor(private vehicleRepository: IVehicleRepository) {}

  async createVehicle(data: {
    marca: string;
    modelo: string;
    año: number;
  }): Promise<Vehicle> {
    const fleetId = await this.assignFleetToVehicle(
      data.marca,
      data.modelo,
      data.año
    );

    const vehicle = new Vehicle(data.marca, data.modelo, data.año, fleetId);
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
    marca: string,
    modelo: string,
    año: number
  ): Promise<string | null> {
    const rules = [
      {
        condition: (marca: string, modelo: string, año: number) =>
          marca === "Chevrolet" &&
          año >= 2018 &&
          ["Aveo", "Optra"].includes(modelo),
        fleetName: "Espectacular",
      },
      {
        condition: (marca: string, modelo: string, año: number) =>
          marca === "Toyota" &&
          año >= 2015 &&
          ["Hilux", "Fortunner", "Prado"].includes(modelo),
        fleetName: "Pickup / Camioneta",
      },
    ];

    for (const rule of rules) {
      if (rule.condition(marca, modelo, año)) {
        const fleet = await FleetModel.findOne({ nombre: rule.fleetName });
        return fleet?._id.toString() || null;
      }
    }

    const fleet = await FleetModel.findOne({ nombre: "Económico" });
    return fleet?._id.toString() || null;
  }
}

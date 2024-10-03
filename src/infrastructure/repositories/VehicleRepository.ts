import { Vehicle } from "../../domain/entities/Vehicle.js";
import { IVehicleRepository } from "../../domain/repositories/IVehicleRepository.js";
import VehicleModel from "../database/models/VehicleModel.js";

export class VehicleRepository implements IVehicleRepository {
  async create(vehicle: Vehicle): Promise<Vehicle> {
    const createdVehicle = new VehicleModel({
      marca: vehicle.marca,
      modelo: vehicle.modelo,
      año: vehicle.año,
    });
    const savedVehicle = await createdVehicle.save();
    return new Vehicle(
      savedVehicle.marca,
      savedVehicle.modelo,
      savedVehicle.año,
      savedVehicle._id.toString()
    );
  }

  async findAll(): Promise<Vehicle[]> {
    const vehicles = await VehicleModel.find();
    return vehicles.map(
      (vehicle) =>
        new Vehicle(
          vehicle.marca,
          vehicle.modelo,
          vehicle.año,
          vehicle._id.toString()
        )
    );
  }
}

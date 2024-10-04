import { Vehicle } from "../../domain/entities/Vehicle.js";
import { IVehicleRepository } from "../../domain/repositories/IVehicleRepository.js";
import VehicleModel from "../database/models/VehicleModel.js";

export class VehicleRepository implements IVehicleRepository {
  async create(vehicle: Vehicle): Promise<Vehicle> {
    const createdVehicle = new VehicleModel({
      marca: vehicle.marca,
      modelo: vehicle.modelo,
      año: vehicle.año,
      fleetId: vehicle.fleetId,
    });
    const savedVehicle = await createdVehicle.save();
    return new Vehicle(
      savedVehicle.marca,
      savedVehicle.modelo,
      savedVehicle.año,
      savedVehicle._id.toString()
    );
  }

  // TODO delete this any
  async findAll(): Promise<any[]> {
    return await VehicleModel.find().populate("fleetId");
  }
}

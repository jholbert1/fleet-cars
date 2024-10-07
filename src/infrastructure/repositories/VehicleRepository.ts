import { Fleet } from "../../domain/entities/Fleet.js";
import { Vehicle } from "../../domain/entities/Vehicle.js";
import { PaginationOptions } from "../../domain/interfaces/PaginationOptions.js";
import { IVehicleRepository } from "../../domain/repositories/IVehicleRepository.js";
import { IFleetDocument } from "../database/interfaces/IFleetDocument.js";
import VehicleModel from "../database/models/VehicleModel.js";

export class VehicleRepository implements IVehicleRepository {
  async create(vehicle: Vehicle): Promise<Vehicle> {
    const createdVehicle = new VehicleModel({
      brand: vehicle.brand,
      carModel: vehicle.carModel,
      year: vehicle.year,
      fleetId: vehicle.fleetId,
    });
    const savedVehicle = await createdVehicle.save();
    return new Vehicle(
      savedVehicle.brand,
      savedVehicle.carModel,
      savedVehicle.year,
      savedVehicle._id.toString()
    );
  }

  async findAll(paginationOptions: PaginationOptions): Promise<Vehicle[]> {
    const { page, limit } = paginationOptions;
    const skip = (page - 1) * limit;

    const vehicles = await VehicleModel.find()
      .populate<{ fleetId: IFleetDocument }>("fleetId")
      .skip(skip)
      .limit(limit)
      .exec();

    return vehicles.map((vehicleDoc) => {
      const fleetData = vehicleDoc.fleetId as IFleetDocument;
      const fleet = new Fleet(fleetData.name, fleetData._id.toString());

      return new Vehicle(
        vehicleDoc.brand,
        vehicleDoc.carModel,
        vehicleDoc.year,
        fleet.id,
        fleet,
        vehicleDoc._id.toString()
      );
    });
  }

  async findByFleet(fleetId: string): Promise<Vehicle[]> {
    const vehicles = await VehicleModel.find({ fleetId })
      .populate<{ fleetId: IFleetDocument }>("fleetId")
      .exec();

    return vehicles.map((vehicleDoc) => {
      const fleetData = vehicleDoc.fleetId as IFleetDocument;
      const fleet = new Fleet(fleetData.name, fleetData._id.toString());

      return new Vehicle(
        vehicleDoc.brand,
        vehicleDoc.carModel,
        vehicleDoc.year,
        fleet.id,
        fleet,
        vehicleDoc._id.toString()
      );
    });
  }

  async count(): Promise<number> {
    const getCount = await VehicleModel.countDocuments().exec();
    return getCount;
  }
}

import { Fleet } from "../../domain/entities/Fleet.js";
import { Vehicle } from "../../domain/entities/Vehicle.js";
import { IVehicleRepository } from "../../domain/repositories/IVehicleRepository.js";
import { IFleetDocument } from "../database/interfaces/IFleetDocument.js";
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
  async findAll(): Promise<Vehicle[]> {
    const vehicles = await VehicleModel.find()
      .populate<{ fleetId: IFleetDocument }>("fleetId")
      .exec();

    return vehicles.map((vehicleDoc) => {
      const fleetData = vehicleDoc.fleetId as IFleetDocument;
      const fleet = new Fleet(fleetData.nombre, fleetData._id.toString());

      return new Vehicle(
        vehicleDoc.marca,
        vehicleDoc.modelo,
        vehicleDoc.año,
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
      const fleet = new Fleet(fleetData.nombre, fleetData._id.toString());

      return new Vehicle(
        vehicleDoc.marca,
        vehicleDoc.modelo,
        vehicleDoc.año,
        fleet.id,
        fleet,
        vehicleDoc._id.toString()
      );
    });
  }
}

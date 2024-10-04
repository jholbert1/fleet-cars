import { Vehicle } from "../entities/Vehicle.js";

export interface IVehicleRepository {
  create(vehicle: Vehicle): Promise<Vehicle>;
  findAll(): Promise<Vehicle[]>;
  findByFleet(fleetId: string): Promise<Vehicle[]>;
}

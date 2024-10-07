import { Vehicle } from "../entities/Vehicle.js";
import { PaginationOptions } from "../interfaces/PaginationOptions.js";

export interface IVehicleRepository {
  create(vehicle: Vehicle): Promise<Vehicle>;
  findAll(paginationOptions: PaginationOptions): Promise<Vehicle[]>;
  findByFleet(fleetId: string): Promise<Vehicle[]>;
  count(): Promise<number>;
}

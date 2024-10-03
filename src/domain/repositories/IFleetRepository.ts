import { Fleet } from "../entities/Fleet.js";

export interface IFleetRepository {
  create(vehicle: Fleet): Promise<Fleet>;
  findAll(): Promise<Fleet[]>;
}

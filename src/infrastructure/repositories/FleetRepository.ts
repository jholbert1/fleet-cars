import { Fleet } from "../../domain/entities/Fleet.js";
import { IFleetRepository } from "../../domain/repositories/IFleetRepository.js";
import FleetModel from "../database/models/FleetModel.js";

export class FleetRepository implements IFleetRepository {
  async create(fleet: Fleet): Promise<Fleet> {
    const createdFleet = new FleetModel({
      nombre: fleet.nombre,
    });
    const savedFleet = await createdFleet.save();
    return new Fleet(savedFleet.nombre, savedFleet._id.toString());
  }

  async findAll(): Promise<Fleet[]> {
    const fleets = await FleetModel.find();
    return fleets.map((fleet) => new Fleet(fleet.nombre, fleet._id.toString()));
  }
}

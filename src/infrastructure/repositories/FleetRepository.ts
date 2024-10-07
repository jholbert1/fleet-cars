import { Fleet } from "../../domain/entities/Fleet.js";
import { IFleetRepository } from "../../domain/repositories/IFleetRepository.js";
import FleetModel from "../database/models/FleetModel.js";

export class FleetRepository implements IFleetRepository {
  async create(fleet: Fleet): Promise<Fleet> {
    const createdFleet = new FleetModel({
      name: fleet.name,
    });
    const savedFleet = await createdFleet.save();
    return new Fleet(savedFleet.name, savedFleet._id.toString());
  }

  async findAll(): Promise<Fleet[]> {
    const fleets = await FleetModel.find();
    return fleets.map((fleet) => new Fleet(fleet.name, fleet._id.toString()));
  }

  async findByName(name: string): Promise<Fleet | null> {
    const fleet = await FleetModel.findOne({ name });
    if (fleet) {
      return new Fleet(fleet.name, fleet._id.toString());
    }
    return null;
  }
}

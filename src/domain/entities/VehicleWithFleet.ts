import { Fleet } from "./Fleet.js";
import { Vehicle } from "./Vehicle.js";

export interface VehicleWithFleet extends Vehicle {
  fleet: Fleet;
}

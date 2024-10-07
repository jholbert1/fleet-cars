import { Fleet } from "./Fleet.js";

export class Vehicle {
  constructor(
    public brand: string,
    public carModel: string,
    public year: number,
    public fleetId?: string | null,
    public fleet?: Fleet,
    public id?: string
  ) {}
}

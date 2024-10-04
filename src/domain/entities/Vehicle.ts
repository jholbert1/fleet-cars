import { Fleet } from "./Fleet.js";

export class Vehicle {
  constructor(
    public marca: string,
    public modelo: string,
    public año: number,
    public fleetId?: string | null,
    public fleet?: Fleet,
    public id?: string
  ) {
    if (!marca || !modelo || !año || !fleetId) {
      throw new Error("Marca, modelo, año y flota son obligatorios");
    }
  }
}

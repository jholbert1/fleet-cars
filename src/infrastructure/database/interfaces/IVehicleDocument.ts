import { Document, Types } from "mongoose";
import { IFleetDocument } from "./IFleetDocument.js";

export interface IVehicleDocument extends Document {
  _id: Types.ObjectId;
  brand: string;
  carModel: string;
  year: number;
  fleetId: Types.ObjectId | IFleetDocument;
}

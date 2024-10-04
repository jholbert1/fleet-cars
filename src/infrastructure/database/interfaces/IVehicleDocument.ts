import { Document, Types } from "mongoose";
import { IFleetDocument } from "./IFleetDocument.js";

export interface IVehicleDocument extends Document {
  _id: Types.ObjectId;
  marca: string;
  modelo: string;
  año: number;
  fleetId: Types.ObjectId | IFleetDocument;
}

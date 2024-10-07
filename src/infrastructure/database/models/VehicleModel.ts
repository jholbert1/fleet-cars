import { Schema, model } from "mongoose";
import { IVehicleDocument } from "../interfaces/IVehicleDocument.js";

const VehicleSchema = new Schema<IVehicleDocument>({
  brand: { type: String, required: true },
  carModel: { type: String, required: true },
  year: { type: Number, required: true },
  fleetId: { type: Schema.Types.ObjectId, ref: "Fleet", required: true },
});

const VehicleModel = model<IVehicleDocument>("Vehicle", VehicleSchema);
export default VehicleModel;

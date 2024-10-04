import { Schema, model } from "mongoose";
import { IVehicleDocument } from "../interfaces/IVehicleDocument.js";

const VehicleSchema = new Schema<IVehicleDocument>({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  año: { type: Number, required: true },
  fleetId: { type: Schema.Types.ObjectId, ref: "Fleet", required: true },
});

const VehicleModel = model<IVehicleDocument>("Vehicle", VehicleSchema);
export default VehicleModel;

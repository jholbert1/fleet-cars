import { Schema, model } from "mongoose";

const VehicleSchema = new Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  año: { type: Number, required: true },
});

export default model("Vehicle", VehicleSchema);

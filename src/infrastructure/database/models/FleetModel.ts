import { Schema, model } from "mongoose";

const FleetSchema = new Schema({
  nombre: { type: String, required: true },
});

export default model("Fleet", FleetSchema);

import { Schema, model } from "mongoose";

const FleetSchema = new Schema({
  name: { type: String, required: true },
});

export default model("Fleet", FleetSchema);

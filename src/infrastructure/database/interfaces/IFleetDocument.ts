import { Document, Types } from "mongoose";

export interface IFleetDocument extends Document {
  _id: Types.ObjectId;
  nombre: string;
}

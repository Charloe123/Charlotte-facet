import mongoose, { Schema, Document } from "mongoose";

export interface IBracelet extends Document {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const BraceletSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Bracelet || mongoose.model<IBracelet>("Bracelet", BraceletSchema);
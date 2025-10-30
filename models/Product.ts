import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
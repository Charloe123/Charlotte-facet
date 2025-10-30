import mongoose, { Schema, Document } from "mongoose";

export interface IForGifts extends Document {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const ForGiftsSchema: Schema = new Schema(
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

export default mongoose.models.ForGifts || mongoose.model<IForGifts>("ForGifts", ForGiftsSchema);
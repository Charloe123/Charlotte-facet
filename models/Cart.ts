import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
});

const CartSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [CartItemSchema],
    total: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
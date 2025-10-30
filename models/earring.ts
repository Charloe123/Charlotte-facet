import mongoose, { Schema, model, models } from "mongoose";

const EarringSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

export default models.Earring || model("Earring", EarringSchema);

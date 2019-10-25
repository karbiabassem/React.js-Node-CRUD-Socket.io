import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    name: { type: String },
    type: { type: String },
    price: { type: Number },
    rating: { type: Number },
    warranty_years: { type: Number },
    available: { type: Boolean }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("product", productSchema);

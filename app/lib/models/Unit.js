import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  //TODO: Custom Unit-ID
  {
    unitId: { type: Number, required: true },
    name: {
      type: String,
      required: true,
      min: 2,
    },
    location: {
      type: String,
      required: true,
      min: 2,
    },
    area: {
      type: String,
      required: true,
      min: 2,
    },
  },
  { timestamps: true }
);

export const Unit = mongoose.models.Unit || mongoose.model("Unit", unitSchema);

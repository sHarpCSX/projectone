import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingDetail",
      },
    ],
  },
  { timestamps: true }
);

export const Rating =
  mongoose.models.Rating || mongoose.model("Rating", ratingSchema);

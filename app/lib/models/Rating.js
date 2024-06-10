import mongoose from "mongoose";

const { Schema } = mongoose;

const RatingSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        social: {
          behaviour: { type: Number, required: true },
          feedback: { type: Number, required: true },
          presence: { type: Number, required: true },
          communication: { type: Number, required: true },
          teamwork: { type: Number, required: true },
          leadership: { type: Number, required: true },
          adaptability: { type: Number, required: true },
        },
        kpi: {
          Zielerreichung: { type: Number, required: true },
          productivity: { type: Number, required: true },
          efficiency: { type: Number, required: true },
          innovation: { type: Number, required: true },
          qualityOfWork: { type: Number, required: true },
          punctuality: { type: Number, required: true },
          clientSatisfaction: { type: Number, required: true },
        },
        additionalCriteria: {
          initiative: { type: Number, required: true },
          problemSolving: { type: Number, required: true },
          dependability: { type: Number, required: true },
          technicalSkills: { type: Number, required: true },
          workEthic: { type: Number, required: true },
          decisionMaking: { type: Number, required: true },
        },
        totalScore: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Rating = mongoose.models.Rating || mongoose.model("Rating", RatingSchema);
export default Rating;

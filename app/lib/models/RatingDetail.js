import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    behaviour: { type: String, required: true },
    feedback: { type: String, required: true },
    presence: { type: String, required: true },
    communication: { type: String, required: true },
    teamwork: { type: String, required: true },
    leadership: { type: String, required: true },
    adaptability: { type: String, required: true },
  },
  { _id: false }
);

const kpiSchema = new mongoose.Schema(
  {
    Zielerreichung: { type: String, required: true },
    productivity: { type: String, required: true },
    efficiency: { type: String, required: true },
    innovation: { type: String, required: true },
    qualityOfWork: { type: String, required: true },
    punctuality: { type: String, required: true },
    clientSatisfaction: { type: String, required: true },
  },
  { _id: false }
);

const additionalCriteriaSchema = new mongoose.Schema(
  {
    initiative: { type: String, required: true },
    problemSolving: { type: String, required: true },
    dependability: { type: String, required: true },
    technicalSkills: { type: String, required: true },
    workEthic: { type: String, required: true },
    decisionMaking: { type: String, required: true },
  },
  { _id: false }
);

const ratingDetailSchema = new mongoose.Schema(
  {
    social: socialSchema,
    kpi: kpiSchema,
    additionalCriteria: additionalCriteriaSchema,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "lastUpdated" } }
);

export const RatingDetail =
  mongoose.models.RatingDetail ||
  mongoose.model("RatingDetail", ratingDetailSchema);

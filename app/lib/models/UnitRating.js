import mongoose from "mongoose";

const UnitRatingSchema = new mongoose.Schema(
  {
    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    ratings: [
      {
        ratingId: { type: Number, required: true },
        ratingUserId: { type: Number, required: true },
        goals: {
          clarity: { type: Number, required: true },
          achievability: { type: Number, required: true },
          alignment: { type: Number, required: true },
        },
        environment: {
          teamwork: { type: Number, required: true },
          support: { type: Number, required: true },
          communication: { type: Number, required: true },
        },
        management: {
          leadership: { type: Number, required: true },
          feedback: { type: Number, required: true },
          decisionMaking: { type: Number, required: true },
        },
        additionalCriteria: {
          workLifeBalance: { type: Number, required: true },
          resources: { type: Number, required: true },
          professionalDevelopment: { type: Number, required: true },
        },
        totalScore: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

UnitRatingSchema.pre("save", async function (next) {
  try {
    this.ratings.forEach((rating, index) => {
      if (!rating.ratingId) {
        rating.ratingId = index + 1;
      }
    });
    next();
  } catch (error) {
    next(error);
  }
});

// Vermeide, das Modell mehrmals zu kompilieren
export const UnitRating =
  mongoose.models.UnitRating || mongoose.model("UnitRating", UnitRatingSchema);

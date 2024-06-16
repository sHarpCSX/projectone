import { User } from "./models/User";
import { Unit } from "./models/Unit";
import { Rating } from "./models/Rating";
import { UnitRating } from "./models/UnitRating";
import { connectToDB } from "./utils";
import mongoose from "mongoose";

const ITEM_PER_PAGE = 10;

/* _______________________________ User _________________________________________ */

export const fetchSingleUser = async (id) => {
  try {
    await connectToDB();
    const singleUser = await User.findById(id).lean();
    return singleUser;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Single User!");
  }
};

export const fetchUsers = async (q = "", page = 1) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDB();
    const count = await User.find({
      $or: [{ firstname: { $regex: regex } }, { lastname: { $regex: regex } }],
    }).countDocuments();

    const users = await User.find({
      $or: [{ firstname: { $regex: regex } }, { lastname: { $regex: regex } }],
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();

    const usersWithRatings = await Promise.all(
      users.map(async (user) => {
        const ratings = await Rating.find({ userId: user._id }).lean();
        if (ratings.length > 0) {
          const lastFiveRatings = ratings
            .slice(-5)
            .map((rating) => rating.ratings.reverse().slice(0, 5));
          const validScores = lastFiveRatings
            .flatMap((ratings) => ratings.map((rating) => rating.totalScore))
            .filter((score) => typeof score === "number" && !isNaN(score));

          if (validScores.length > 0) {
            user.averageTotalScore = (
              validScores.reduce((acc, score) => acc + score, 0) /
              validScores.length
            ).toFixed(2);
          } else {
            user.averageTotalScore = "N/A";
          }
        } else {
          user.averageTotalScore = "N/A";
        }
        return user;
      })
    );
    return { count, users: usersWithRatings };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
};

/* _______________________________ Unit _________________________________________ */

export const fetchUnits = async (q = "", page = 1) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDB();
    const count = await Unit.find({
      $or: [{ name: { $regex: regex } }, { location: { $regex: regex } }],
    }).countDocuments();

    const units = await Unit.find({
      $or: [{ name: { $regex: regex } }, { location: { $regex: regex } }],
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();

    const unitsWithAverageTotalScore = await Promise.all(
      units.map(async (unit) => {
        const ratings = await UnitRating.find({ unitId: unit._id }).lean();
        if (ratings.length > 0) {
          const totalScores = ratings.flatMap((rating) =>
            rating.ratings
              .map((r) => r.totalScore)
              .filter((score) => typeof score === "number" && !isNaN(score))
          );

          if (totalScores.length > 0) {
            const averageTotalScore =
              totalScores.reduce((acc, score) => acc + score, 0) /
              totalScores.length;
            unit.averageTotalScore = averageTotalScore.toFixed(2);
          } else {
            unit.averageTotalScore = "N/A";
          }
        } else {
          unit.averageTotalScore = "N/A";
        }
        return unit;
      })
    );
    return { count, units: unitsWithAverageTotalScore };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch units!");
  }
};

export const fetchSingleUnit = async (id) => {
  try {
    await connectToDB();
    const unit = await Unit.findById(id).populate(
      "manager contactPerson parentUnit"
    );
    return unit;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Single Unit!");
  }
};

/* _______________________________ Rating _________________________________________ */

export const fetchRatings = async (page) => {
  try {
    await connectToDB();
    const count = await Rating.countDocuments();
    const ratings = await Rating.find()
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, ratings };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch ratings!");
  }
};

export const fetchRatingsById = async (userId) => {
  try {
    const ratings = await Rating.find({ userId: userId });
    return ratings;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch ratings!");
  }
};

export const fetchSingleRatingById = async ({ userId, ratingId }) => {
  try {
    const ratingDoc = await Rating.findOne({ userId });
    if (!ratingDoc) {
      throw new Error("Benutzer nicht gefunden");
    }
    const rating = ratingDoc.ratings.find((r) =>
      r._id.equals(new mongoose.Types.ObjectId(ratingId))
    );
    if (!rating) {
      throw new Error("Rating mit der ID nicht gefunden");
    }

    return rating;
  } catch (error) {
    console.error("Fehler beim Abrufen des Ratings:", error);
    throw new Error("Fehler beim Abrufen des Ratings");
  }
};

/*_______________________________ UnitRating  ______________________________________*/

export const fetchRatingsByUnitId = async (unitId) => {
  try {
    const ratings = await UnitRating.find({ unitId });
    return ratings;
  } catch (error) {
    console.error("Error fetching ratings by unit ID:", error);
    return [];
  }
};

export const fetchSingleUnitRatingById = async ({ unitId, ratingId }) => {
  try {
    const ratingDoc = await UnitRating.findOne({ unitId });

    if (!ratingDoc) {
      throw new Error("Unit nicht gefunden");
    }
    const rating = ratingDoc.ratings.find((r) =>
      r._id.equals(new mongoose.Types.ObjectId(ratingId))
    );
    if (!rating) {
      throw new Error("Rating mit der ID nicht gefunden");
    }

    return rating;
  } catch (error) {
    console.error("Fehler beim Abrufen des Ratings:", error);
    throw new Error("Fehler beim Abrufen des Ratings");
  }
};

/*__________________________________ Dashboard ____________________________________ */

// Verknüpfe die beiden Funktionen, um die neuesten Bewertungen zu holen und die Benutzer zu populieren
/* export const fetchRatingsWithUser = async () => {
  try {
    const latestRatings = await fetchLatestRatings();
    const ratingsWithUsers = await populateUsers(latestRatings);
    return ratingsWithUsers;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch latest ratings with users!");
  }
}; */

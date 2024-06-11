import { User } from "./models/User";
import { Unit } from "./models/Unit";
import { Rating } from "./models/Rating";
import { connectToDB } from "./utils";
import mongoose from "mongoose";

const ITEM_PER_PAGE = 10;

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    connectToDB();
    const count = await User.find({
      $or: [{ firstname: { $regex: regex } }, { lastname: { $regex: regex } }],
    }).count();

    const users = await User.find({
      $or: [{ firstname: { $regex: regex } }, { lastname: { $regex: regex } }],
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, users };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
};
export const fetchSingleUser = async (id) => {
  try {
    connectToDB();
    const singleUser = await User.findById(id);
    return singleUser;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Single User!");
  }
};

export const fetchUnits = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    connectToDB();
    const count = await Unit.find({
      name: { $regex: regex },
    }).count();

    const units = await Unit.find({
      name: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, units };
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
    console.log(ratings);
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

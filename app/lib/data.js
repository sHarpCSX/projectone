import { User } from "./models/User";
import { Unit } from "./models/Unit";
import Rating from "./models/Rating";
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
    connectToDB();
    const singleUnit = await Unit.findById(id);
    return singleUnit;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Single Unit!");
  }
};

export const fetchRatings = async (user_id, page) => {
  try {
    connectToDB();

    const query = user_id
      ? { user_id: new mongoose.Types.ObjectId(user_id) }
      : {};

    const count = await Rating.countDocuments(query);
    const ratings = await Rating.find(query)
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, ratings };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch ratings!");
  }
};

export const fetchRatingById = async (id) => {
  try {
    const rating = await Rating.find({})
      .populate("user_id") // Hier das User-Objekt popeln
      .exec();

    if (!rating) {
      return null; // Rating mit der ID wurde nicht gefunden
    }

    // Suche nach dem Rating innerhalb des Arrays ratings, das die gesuchte ID enthält
    const foundRating = rating.ratings.find((r) => r._id.toString() === id);

    return foundRating;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch rating!");
  }
};

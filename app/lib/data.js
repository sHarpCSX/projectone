import { User } from "./models/User";
import { Unit } from "./models/Unit";
import { connectToDB } from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 2;

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
  const ITEM_PER_PAGE = 2;
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

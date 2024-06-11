"use server";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { User } from "./models/User";
import { Unit } from "./models/Unit";
import { connectToDB } from "./utils";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import { Rating } from "./models/Rating";

/* ------------------------ User ---------------------------------------- */

export const addUser = async (formData) => {
  const {
    firstname,
    lastname,
    dob,
    email,
    password,
    phone,
    position,
    unit: unitId,
    role,
    isActive,
  } = Object.fromEntries(formData);

  try {
    await connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Finde die höchste vorhandene userId und erhöhe sie um 1
    const highestUser = await User.findOne().sort({ userId: -1 }).limit(1);
    const userId = highestUser ? highestUser.userId + 1 : 1;

    const newUser = new User({
      userId,
      firstname,
      lastname,
      dob,
      email,
      password: hashedPassword,
      phone,
      position,
      unit: unitId,
      role,
      isActive,
    });
    await newUser.save();

    const unit = await Unit.findOne({ unitId });
    if (unit) {
      // If the new user is the manager, avoid double-counting
      if (unit.manager !== userId) {
        unit.employees = unit.employees + 1;
      } else if (unit.employees === 0) {
        unit.employees = 1;
      }
      await unit.save();
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create User!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const {
    id,
    firstname,
    lastname,
    dob,
    email,
    phone,
    position,
    unit,
    role,
    isActive,
  } = Object.fromEntries(formData);

  try {
    connectToDB();

    const user = await User.findById(id);
    const oldUnitId = user.unit;

    // Aktualisiere die Benutzerdaten
    const updateFields = {
      firstname,
      lastname,
      dob,
      email,
      phone,
      position,
      unit,
      role,
      isActive,
    };
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || updateFields[key] === undefined) &&
        delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);

    // Wenn die Unit geändert wurde, aktualisiere die Mitarbeiteranzahlen
    if (oldUnitId !== unit) {
      const oldUnit = await Unit.findOne({ unitId: oldUnitId });
      const newUnit = await Unit.findOne({ unitId: unit });

      if (oldUnit) {
        oldUnit.employees -= 1;
        await oldUnit.save();
      }

      if (newUnit) {
        newUnit.employees += 1;
        await newUnit.save();
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update User!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDB();

    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const unit = await Unit.findOne({ unitId: user.unit });
    if (unit) {
      // If the deleted user is the manager, update the manager field and avoid double-counting
      if (unit.manager === user.userId) {
        unit.manager = null;
        unit.employees = unit.employees - 1;
      } else if (unit.employees > 0) {
        unit.employees = unit.employees - 1;
      }
      await unit.save();
    }

    await User.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete User!");
  }

  revalidatePath("/dashboard/users");
};

/* ------------------------ Unit ---------------------------------------- */

export const addUnit = async (formData) => {
  const {
    name,
    location,
    area,
    manager,
    contactPerson,
    description,
    parentUnit,
  } = Object.fromEntries(formData);

  try {
    await connectToDB();

    // Finde die höchste vorhandene unitId und erhöhe sie um 1
    const highestUnit = await Unit.findOne().sort({ unitId: -1 }).limit(1);
    const unitId = highestUnit ? highestUnit.unitId + 1 : 1;

    const newUnit = new Unit({
      unitId,
      name,
      location,
      area,
      manager,
      employees: manager ? 1 : 0,
      contactPerson,
      description,
      parentUnit,
    });
    await newUnit.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Unit!");
  }

  revalidatePath("/dashboard/units");
  redirect("/dashboard/units");
};

export const updateUnit = async (formData) => {
  const {
    id,
    name,
    location,
    area,
    manager,
    contactPerson,
    description,
    parentUnit,
  } = Object.fromEntries(formData);

  try {
    await connectToDB();

    // Fetch the current unit to check the current manager status
    const currentUnit = await Unit.findById(id);
    if (!currentUnit) {
      throw new Error("Unit not found");
    }

    const updateFields = {
      name,
      location,
      area,
      manager,
      contactPerson,
      description,
      parentUnit,
    };

    // Update employees count if manager is added or removed
    if (manager && !currentUnit.manager) {
      // Check if the manager is the only person in the unit
      if (currentUnit.employees === 0) {
        updateFields.employees = 1;
      } else {
        updateFields.employees = currentUnit.employees + 1;
      }
    } else if (!manager && currentUnit.manager) {
      updateFields.employees = currentUnit.employees - 1;
    }

    // Prevent double-counting if manager is also an employee
    if (manager && currentUnit.manager === manager) {
      updateFields.employees = currentUnit.employees;
    }

    await Unit.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update Unit!");
  }

  revalidatePath("/dashboard/units");
  redirect("/dashboard/units");
};

export const deleteUnit = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDB();

    const unit = await Unit.findById(id);
    if (!unit) {
      throw new Error("Unit not found");
    }

    // Set unit ID to null for users associated with this unit
    await User.updateMany({ unit: unit.unitId }, { $set: { unit: null } });

    // Delete the unit
    await Unit.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete Unit!");
  }

  revalidatePath("/dashboard/units");
};

/* ------------------------ Rating ---------------------------------------- */

export const addRating = async (formData) => {
  const userId = formData.get("userId");
  const ratingUserId = formData.get("ratingUserId");

  const social = {};
  formData.forEach((value, key) => {
    if (key.startsWith("social_")) {
      social[key.substring(7)] = value;
    }
  });

  const kpi = {};
  formData.forEach((value, key) => {
    if (key.startsWith("kpi_")) {
      kpi[key.substring(4)] = value;
    }
  });

  const additionalCriteria = {};
  formData.forEach((value, key) => {
    if (key.startsWith("additionalCriteria_")) {
      additionalCriteria[key.substring(19)] = value;
    }
  });

  const totalScore = Object.values(social)
    .concat(Object.values(kpi))
    .concat(Object.values(additionalCriteria))
    .reduce((acc, cur) => acc + parseInt(cur), 0);

  try {
    connectToDB();

    // Find existing rating entry for the user
    let existingRating = await Rating.findOne({ userId });

    // If no existing entry, create a new one
    if (!existingRating) {
      existingRating = new Rating({
        userId,
        ratings: [],
      });
    }

    // Find the highest existing ratingId in the entire database
    const maxRatingId = await Rating.aggregate([
      { $unwind: "$ratings" },
      { $group: { _id: null, maxRatingId: { $max: "$ratings.ratingId" } } },
    ]);

    const newRatingId =
      maxRatingId.length > 0 ? maxRatingId[0].maxRatingId + 1 : 1;

    const newRating = {
      ratingId: newRatingId,
      ratingUserId,
      social,
      kpi,
      additionalCriteria,
      totalScore,
    };

    // Add the new rating to the existing ratings array
    existingRating.ratings.push(newRating);

    // Save the updated rating entry
    await existingRating.save();
  } catch (error) {
    console.log("Error creating rating:", error);
    throw new Error("Failed to create Rating!");
  }

  revalidatePath("/dashboard/ratings");
  redirect("/dashboard/ratings");
};
/* ------------------------ Authentication ---------------------------------------- */

export const authenticate = async (prevState, formData) => {
  const { email, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", { email, password });
  } catch (err) {
    return "Wrong Credentials!";
  }
};

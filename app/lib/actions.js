"use server";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { User } from "./models/User";
import { Unit } from "./models/Unit";
import { connectToDB } from "./utils";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import Rating from "./models/Rating";

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
    unit,
    role,
    isActive,
  } = Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstname,
      lastname,
      dob,
      email,
      password: hashedPassword,
      phone,
      position,
      unit,
      role,
      isActive,
    });
    await newUser.save();
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
    password,
    phone,
    position,
    unit,
    role,
    isActive,
  } = Object.fromEntries(formData);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    connectToDB();
    const updateFields = {
      firstname,
      lastname,
      dob,
      email,
      password: hashedPassword,
      phone,
      position,
      unit,
      role,
      isActive,
    };
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
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
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete User!");
  }

  revalidatePath("/dashboard/users");
};

/* ------------------------ Unit ---------------------------------------- */

export const addUnit = async (formData) => {
  const { unitId, name, location, area } = Object.fromEntries(formData);

  try {
    connectToDB();
    const newUnit = new Unit({
      unitId,
      name,
      location,
      area,
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
  const { id, unitId, name, location, area } = Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      unitId,
      name,
      location,
      area,
    };
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

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
    connectToDB();
    await Unit.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete Unit!");
  }

  revalidatePath("/dashboard/units");
};

/* ------------------------ Rating ---------------------------------------- */

export const addRating = async (formData) => {
  const ObjectId = mongoose.Types.ObjectId;

  const user_id = formData.get("user_id");

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

    let existingRating = await Rating.findOne({ user_id });

    if (!existingRating) {
      // Falls kein Rating vorhanden ist, ein neues erstellen
      existingRating = new Rating({
        user_id,
        ratings: [], // Initialisierung von ratings
      });
    } else if (!existingRating.rating) {
      // Falls das vorhandene Rating keine Bewertungen hat, ein leeres Array initialisieren
      existingRating.rating = [];
    }

    const newRating = {
      _id: new ObjectId(),
      createdAt: new Date(),
      lastUpdated: new Date(),
      social,
      kpi,
      additionalCriteria,
      totalScore,
    };
    console.log(existingRating);
    console.log(existingRating.rating);
    existingRating.rating.push(newRating); // Hinzufügen des neuen Ratings zum Array

    await existingRating.save();
  } catch (error) {
    console.log("Error creating rating:", error);
    throw new Error("Failed to create Rating!");
  }

  revalidatePath("/dashboard/ratings");
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

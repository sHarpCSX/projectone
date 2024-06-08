"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { User } from "./models/User";
import { Unit } from "./models/Unit";
import { connectToDB } from "./utils";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import Rating from "./models/Rating";
import RatingDetail from "./models/RatingDetail";

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
  const {
    user_id,
    social_behaviour,
    social_feedback,
    social_presence,
    social_communication,
    social_teamwork,
    social_leadership,
    social_adaptability,
    kpi_Zielerreichung,
    kpi_productivity,
    kpi_efficiency,
    kpi_innovation,
    kpi_qualityOfWork,
    kpi_punctuality,
    kpi_clientSatisfaction,
    additionalCriteria_initiative,
    additionalCriteria_problemSolving,
    additionalCriteria_dependability,
    additionalCriteria_technicalSkills,
    additionalCriteria_workEthic,
    additionalCriteria_decisionMaking,
  } = Object.fromEntries(formData);

  try {
    await connectToDB();

    const newRatingDetail = new RatingDetail({
      social: {
        behaviour: social_behaviour,
        feedback: social_feedback,
        presence: social_presence,
        communication: social_communication,
        teamwork: social_teamwork,
        leadership: social_leadership,
        adaptability: social_adaptability,
      },
      kpi: {
        Zielerreichung: kpi_Zielerreichung,
        productivity: kpi_productivity,
        efficiency: kpi_efficiency,
        innovation: kpi_innovation,
        qualityOfWork: kpi_qualityOfWork,
        punctuality: kpi_punctuality,
        clientSatisfaction: kpi_clientSatisfaction,
      },
      additionalCriteria: {
        initiative: additionalCriteria_initiative,
        problemSolving: additionalCriteria_problemSolving,
        dependability: additionalCriteria_dependability,
        technicalSkills: additionalCriteria_technicalSkills,
        workEthic: additionalCriteria_workEthic,
        decisionMaking: additionalCriteria_decisionMaking,
      },
    });

    await newRatingDetail.save();

    const newRating = new Rating({
      user_id,
      rating: [newRatingDetail._id],
    });

    await newRating.save();
  } catch (error) {
    console.log(error);
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

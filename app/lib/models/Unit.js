import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    unitId: { type: Number, unique: true, required: true },
    name: { type: String, required: true, min: 2 },
    location: { type: String, required: true, min: 2 },
    area: { type: String, required: true, min: 2 },
    manager: { type: Number }, // Manager der Einheit
    employees: { type: Number, default: 0 }, // Mitarbeiter der Einheit
    contactPerson: { type: Number }, // Kontaktperson für die Einheit
    description: { type: String }, // Beschreibung der Einheit
    parentUnit: { type: Number }, // Übergeordnete Einheit
  },
  { timestamps: true }
);

export const Unit = mongoose.models.Unit || mongoose.model("Unit", unitSchema);

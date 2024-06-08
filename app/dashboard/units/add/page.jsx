import React from "react";
import styles from "../../../ui/dashboard/units/addUnit/addUnit.module.css";
import { addUnit } from "../../../lib/actions";

const addUnitPage = () => {
  return (
    <div className={styles.container}>
      <form action={addUnit} className={styles.form}>
        <input type="number" placeholder="ID" name="unitId" required />
        <input type="text" placeholder="Name" name="name" required />
        <input type="text" placeholder="Location" name="location" />
        <select name="area">
          <option value="general" selected>
            Choose an Area
          </option>
          <option value="Sales">Sales</option>
          <option value="HR">HR</option>
          <option value="Marketing">Marketing</option>
          <option value="Controlling">Controlling</option>
          <option value="Finance">Finance</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default addUnitPage;

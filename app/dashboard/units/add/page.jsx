import React from "react";
import styles from "../../../ui/dashboard/units/addUnit/addUnit.module.css";
import { addUnit } from "../../../lib/actions";

const addUnitPage = () => {
  return (
    <div className={styles.container}>
      <form action={addUnit} className={styles.form}>
        <input type="text" placeholder="Name" name="name" required />
        <input type="text" placeholder="Location" name="location" required />
        <select name="area" required>
          <option value="">Choose an Area</option>
          <option value="Sales">Sales</option>
          <option value="HR">HR</option>
          <option value="Marketing">Marketing</option>
          <option value="Controlling">Controlling</option>
          <option value="Finance">Finance</option>
        </select>
        {/* Additional fields */}
        <input type="text" placeholder="Manager" name="manager" />
        <input type="text" placeholder="Contact Person" name="contactPerson" />
        <input type="text" placeholder="Description" name="description" />
        <input type="text" placeholder="Parent Unit" name="parentUnit" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default addUnitPage;

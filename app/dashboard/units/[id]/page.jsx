import React from "react";
import styles from "../../../ui/dashboard/units/singleUnit/singleUnit.module.css";
import { fetchSingleUnit } from "../../../lib/data";
import { updateUnit } from "../../../lib/actions";

const SingleUnitPage = async ({ params }) => {
  const { id } = params;
  const unit = await fetchSingleUnit(id);
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form action={updateUnit} className={styles.form}>
          <input type="hidden" name="id" value={unit.id}></input>
          <label>ID</label>
          <input type="number" placeholder={unit.unitId} name="unitId" />
          <label>Name</label>
          <input type="text" placeholder={unit.name} name="name" />
          <label>Location</label>
          <input type="text" placeholder={unit.location} name="location" />
          <label>Area</label>
          <select name="area" id="">
            <option value="general">Choose an Area</option>
            <option value="Sales" selected={unit.area === "Sales"}>
              Sales
            </option>
            <option value="HR" selected={unit.area === "HR"}>
              HR
            </option>
            <option value="Marketing" selected={unit.area === "Marketing"}>
              Marketing
            </option>
            <option value="Controlling" selected={unit.area === "Controlling"}>
              Controlling
            </option>
            <option value="Finance" selected={unit.area === "Finance"}>
              Finance
            </option>
          </select>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUnitPage;

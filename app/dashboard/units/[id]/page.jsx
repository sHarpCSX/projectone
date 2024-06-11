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
          <input
            type="number"
            placeholder={unit.unitId}
            name="unitId"
            readOnly
          />
          <label>Name</label>
          <input type="text" defaultValue={unit.name} name="name" />
          <label>Location</label>
          <input type="text" defaultValue={unit.location} name="location" />
          <label>Area</label>
          <select name="area" defaultValue={unit.area}>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="Controlling">Controlling</option>
            <option value="Finance">Finance</option>
          </select>
          <label>Manager</label>
          <input type="number" defaultValue={unit.manager} name="manager" />
          <label>Contact Person</label>
          <input
            type="number"
            defaultValue={unit.contactPerson}
            name="contactPerson"
          />
          <label>Description</label>
          <textarea
            defaultValue={unit.description}
            name="description"
          ></textarea>
          <label>Parent Unit</label>
          <input
            type="number"
            defaultValue={unit.parentUnit}
            name="parentUnit"
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUnitPage;

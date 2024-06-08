import React from "react";
import styles from "../../ui/dashboard/units/units.module.css";
import Search from "../../ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "../../ui/dashboard/pagination/pagination";
import { fetchUnits } from "../../lib/data";
import { deleteUnit } from "../../lib/actions";

const UnitsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, units } = await fetchUnits(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a unit ..." />
        <Link href="/dashboard/units/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Unit-ID</td>
            <td>Name</td>
            <td>Area</td>
            <td>Location</td>
            <td>Personnel</td>
            <td>Performance</td>
            <td>Change</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {units.map((unit) => (
            <tr key={unit.id}>
              <td>{unit.unitId}</td>
              <td>
                <div className={styles.unit}>{unit.name}</div>
              </td>
              <td>{unit.area}</td>
              <td>{unit.location}</td>
              <td>?</td>
              <td>
                <span className={styles.performance}>?</span>
              </td>
              <td>
                <span className={styles.changePositive}>+?</span>
              </td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/units/${unit.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteUnit}>
                    <input type="hidden" name="id" value={unit.id}></input>
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default UnitsPage;

import React from "react";
import styles from "../../ui/dashboard/units/units.module.css";
import Search from "../../ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "../../ui/dashboard/pagination/pagination";
import { fetchUnits } from "../../lib/data";
import { deleteUnit } from "../../lib/actions";
import { auth } from "../../auth";

const UnitsPage = async ({ searchParams }) => {
  const userSession = await auth();
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, units } = await fetchUnits(q, page);
  const userRole = userSession.user.role;

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
          {units.map((unit, index) => (
            <tr key={index}>
              <td>{unit.unitId}</td>
              <td>
                <div className={styles.unit}>{unit.name}</div>
              </td>
              <td>{unit.area}</td>
              <td>{unit.location}</td>
              <td>{unit.employees}</td>
              <td>
                <span className={styles.performance}>
                  {unit.averageTotalScore}
                </span>
              </td>
              <td>
                <span className={styles.changePositive}>+?</span>
              </td>
              <td>
                <div className={styles.buttons}>
                  <div>
                    {userRole !== "User" && (
                      <div className={styles.buttonDiv}>
                        <Link href={`/dashboard/units/view/${unit._id}`}>
                          <button className={`${styles.button} ${styles.btn}`}>
                            View
                          </button>
                        </Link>

                        <Link href={`/dashboard/units/edit/${unit._id}`}>
                          <button className={`${styles.button} ${styles.btn}`}>
                            Edit
                          </button>
                        </Link>

                        <form action={deleteUnit}>
                          <input
                            type="hidden"
                            name="id"
                            value={unit._id.toString()}
                          ></input>
                          <button className={`${styles.button} ${styles.btn}`}>
                            Delete
                          </button>
                        </form>
                      </div>
                    )}
                    <Link href={`/dashboard/units/rate/${unit._id}`}>
                      <button className={`${styles.button} ${styles.btn}`}>
                        Rate
                      </button>
                    </Link>
                  </div>
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

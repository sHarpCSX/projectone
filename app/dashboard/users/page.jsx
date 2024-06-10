import React from "react";
import styles from "../../ui/dashboard/users/users.module.css";
import Search from "../../ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../../ui/dashboard/pagination/pagination";
import { fetchUsers } from "../../lib/data";
import { deleteUser } from "../../lib/actions";

const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUsers(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user ..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>User-ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Position</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Unit-ID</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            //TODO: userId anpassen
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.firstname} {user.lastname}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.position}</td>
              <td>{user.createdAt?.toString().slice(4, 16)}</td>
              <td>{user.role}</td>
              <td>{user.unit}</td>
              <td>{user.isActive ? "active" : "passive"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/view/${user.id}`}>
                    <button className={`${styles.button} ${styles.btn}`}>
                      View
                    </button>
                  </Link>
                  <Link href={`/dashboard/users/rate/${user.id}`}>
                    <button className={`${styles.button} ${styles.btn}`}>
                      Rate
                    </button>
                  </Link>
                  <Link href={`/dashboard/users/edit/${user.id}`}>
                    <button className={`${styles.button} ${styles.btn}`}>
                      Edit
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={user.id}></input>
                    <button className={`${styles.button} ${styles.btn}`}>
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

export default UsersPage;

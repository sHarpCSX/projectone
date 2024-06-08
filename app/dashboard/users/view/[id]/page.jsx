import React from "react";
import styles from "../../../../ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { fetchSingleUser } from "../../../../lib/data";
import { updateUser } from "../../../../lib/actions";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchSingleUser(id);

  console.log(user.dob);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imageContainer}>
          <Image src={user.img || "/noavatar.png"} alt="" fill />
        </div>
        {user.firstname} {user.lastname}
      </div>
      <div className={styles.viewContainer}>
        <p>Firstname: {user.firstname} </p>

        <p>Lastname: {user.lastname} </p>

        {/* <p>Date of Birth: {user.dob}</p> */}

        <p>Email: {user.email}</p>

        <p>Phone: {user.phone}</p>

        <p>Position: {user.position}</p>

        <p>Unit-ID: {user.unit}</p>

        <p>Role: {user.role}</p>

        <p>Status: {user.isActive ? "Active" : "Passive"}</p>
      </div>
    </div>
  );
};

export default SingleUserPage;

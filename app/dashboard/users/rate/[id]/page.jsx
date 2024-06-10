// pages/dashboard/users/[id]/rate.js

import React from "react";
import styles from "../../../../ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { fetchSingleUser } from "../../../../lib/data";
import RatingForm from "../../../../ui/dashboard/users/singleUser/rateUser/RatingForm";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchSingleUser(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imageContainer}>
          <Image src={user.img || "/noavatar.png"} alt="" fill />
        </div>
        {user.firstname} {user.lastname}
      </div>
      <div className={styles.formContainer}>
        <RatingForm userId={user._id.toString()} />
      </div>
    </div>
  );
};

export default SingleUserPage;

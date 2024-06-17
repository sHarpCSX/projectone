import React from "react";
import styles from "../../../../ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { fetchSingleUser } from "../../../../lib/data";
import { updateUser } from "../../../../lib/actions";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchSingleUser(id);
  console.log(user);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={user.img || "/noavatar.png"}
            alt=""
            width={200}
            height={300}
          />
        </div>
        {user.firstname} {user.lastname}
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" name="id" value={user._id}></input>

          <input type="text" name="firstname" placeholder={user.firstname} />

          <input type="text" name="lastname" placeholder={user.lastname} />

          <input type="date" name="dob" placeholder={user.dob} />

          <input type="email" name="email" placeholder={user.email} />

          <input type="password" name="password" placeholder="Password" />

          <input type="text" name="phone" placeholder={user.phone} />

          <input type="text" name="position" placeholder={user.position} />

          <input type="number" name="unit" placeholder={user.unit} />

          <select name="role" id="role">
            <option value="Admin" selected={user.role === "Admin"}>
              Admin
            </option>
            <option value="Editor" selected={user.role === "Editor"}>
              Editor
            </option>
            <option value="User" selected={user.role === "User"}>
              User
            </option>
          </select>

          <select name="isActive" id="isActive">
            {/* <option value={true}>Is Active?</option> */}
            <option value={true} selected={user.isActive}>
              Yes
            </option>
            <option value={false} selected={!user.isActive}>
              No
            </option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;

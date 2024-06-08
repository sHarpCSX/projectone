import styles from "../../../ui/dashboard/users/addUser/addUser.module.css";
import { addUser } from "../../../lib/actions";

const addUserPage = () => {
  return (
    <div className={styles.container}>
      <form action={addUser} className={styles.form}>
        <input type="text" placeholder="Firstname" name="firstname" required />
        <input type="text" placeholder="Lastname" name="lastname" required />
        <div className={styles.dobContainer}>
          <label className={styles.label}>Date of Birth</label>
          <input
            type="date"
            placeholder="Date of Birth"
            name="dob"
            required
            className={styles.dob}
          />
        </div>

        <input type="email" placeholder="Email" name="email" required />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <input type="text" placeholder="Phone" name="phone" required />
        <input type="text" placeholder="Position" name="position" required />
        <input type="number" name="unit" placeholder="Unit-ID" required />
        <select name="role" id="role">
          <option value="user">Choose a Role</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="user">User</option>
        </select>
        <select name="isActive" id="isActive">
          <option value={true}>Is Active?</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default addUserPage;

import React from "react";
import styles from "./sidebar.module.css";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import { auth, signOut } from "../../../auth";

import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import { FaUnity, FaRankingStar } from "react-icons/fa6";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
        roles: ["Admin"],
      },
      {
        title: "Units",
        path: "/dashboard/units",
        icon: <FaUnity />,
        roles: ["Admin", "User"],
      },
      {
        title: "Ratings",
        path: "/dashboard/ratings",
        icon: <MdAttachMoney />,
        roles: ["Admin"],
      },
      {
        title: "Ranking",
        path: "/dashboard/ranking",
        icon: <FaRankingStar />,
        roles: ["Admin", "User"],
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
        roles: ["Admin"],
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
        roles: ["Admin"],
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />,
        roles: ["Admin"],
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
        roles: ["Admin", "User"],
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
        roles: ["Admin", "User"],
      },
    ],
  },
];
const Sidebar = async () => {
  const userSession = await auth();
  const userName = userSession.firstname + " " + userSession.lastname;
  const userPosition = userSession.position;
  const userImage = userSession.user.img;
  const userRole = userSession.user.role;

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          src={userImage || "/noavatar.png"}
          alt=""
          width="50"
          height="50"
          className={styles.userImage}
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{userName}</span>
          <span className={styles.userTitle}>{userPosition}</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list
              .filter((item) => !item.roles || item.roles.includes(userRole))
              .map((item) => (
                <MenuLink item={item} key={item.title} />
              ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};
export default Sidebar;

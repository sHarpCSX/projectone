import React from "react";
import styles from "../ui/login/login.module.css";
import Image from "next/image";
import LoginForm from "../ui/login/loginForm/loginForm";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <Image
        src="/logo.png"
        alt="logo"
        width={450}
        height={100}
        className={styles.logo}
      />
      <LoginForm />
      {/*  <div className={styles.bg1}></div>
      <div className={styles.bg2}></div> */}
    </div>
  );
};

export default LoginPage;

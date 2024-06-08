import Link from "next/link";
import styles from "./homepage.module.css";
import Image from "next/image";

const Homepage = () => {
  return (
    <div className={styles.container}>
      <Link href={`/login`}>
        <Image
          src="/logo.png"
          alt=""
          width={450}
          height={100}
          className={styles.logo}
        />
      </Link>
      <div className={styles.bg1}></div>
      <div className={styles.bg2}></div>
    </div>
  );
};

export default Homepage;

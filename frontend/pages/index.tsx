import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import fullColorLogo from "../public/logo-full-color.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Explore bulb</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/bulb-favicon.ico" />
      </Head>

      <main className={styles.main}>
        <span className={styles.bgShape}></span>
        <Link href="/login">
          <a>
            <h1 className={styles.title}>
              <span>Get Started</span>
              <span className={styles.bulbHover}>
                With <b>bulb</b>
                <span>💡</span>
              </span>
            </h1>
          </a>
        </Link>
      </main>

      <footer className={styles.footer}>
        <span className={styles.logo}>
          <Image src={fullColorLogo} alt="bulb Logo" width={144} height={64} />
        </span>
      </footer>
    </div>
  );
}

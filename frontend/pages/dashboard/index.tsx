import Head from "next/head";
import Image from "next/image";
import IdeaList from "../../components/IdeaList/IdeaList";
import fullColorLogo from "../../public/bulb_full_color.svg";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Explore bulb</title>
        <meta name="description" content="Dashboard page" />
        <link rel="icon" href="/bulb-favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Here are your current Ideas:</h1>
        <IdeaList />
      </main>

      <footer className={styles.footer}>
        <span className={styles.logo}>
          <Image src={fullColorLogo} alt="bulb Logo" width={144} height={64} />
        </span>
      </footer>
    </div>
  );
}

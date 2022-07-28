import Head from "next/head";
import DashboardLayout from "../../../templates/DashboardLayout";
import styles from "./Settings.module.scss";

export default function Settings() {
  return (
    <DashboardLayout title="Settings" className={styles.Settings}>
      <Head>
        <title>Explore bulb</title>
        <meta name="description" content="Settings page" />
        <link rel="icon" href="/bulb-favicon.ico" />
      </Head>
      <main className={styles.main}>Settings</main>
    </DashboardLayout>
  );
}

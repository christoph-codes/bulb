import Head from "next/head";
import DashboardLayout from "../../../templates/DashboardLayout";
import styles from "./Connections.module.scss";

export default function Connections() {
  return (
    <DashboardLayout title="Connections" className={styles.Connections}>
      <Head>
        <title>Explore bulb</title>
        <meta name="description" content="Connections page" />
        <link rel="icon" href="/bulb-favicon.ico" />
      </Head>
      <main className={styles.main}>Connections</main>
    </DashboardLayout>
  );
}

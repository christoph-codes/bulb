import Head from "next/head";
import IdeaList from "../../components/IdeaList/IdeaList";
import DashboardLayout from "../../templates/DashboardLayout";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  return (
    <DashboardLayout title="My Ideas" className={styles.Dashboard}>
      <Head>
        <title>Explore bulb</title>
        <meta name="description" content="Dashboard page" />
        <link rel="icon" href="/bulb-favicon.ico" />
      </Head>
      <main className={styles.main}>
        <IdeaList />
      </main>
    </DashboardLayout>
  );
}

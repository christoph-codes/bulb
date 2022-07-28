import Head from "next/head";
import Image from "next/image";
import IdeaList from "../../components/IdeaList/IdeaList";
import fullColorLogo from "../../public/bulb_full_color.svg";
import DashboardLayout from "../../templates/DashboardLayout";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  return (
    <DashboardLayout title="Current Ideas" className={styles.Dashboard}>
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

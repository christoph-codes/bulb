import Head from "next/head";
import IdeaList from "../../components/IdeaList/IdeaList";
import DashboardLayout from "../../templates/DashboardLayout";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
	return (
		<DashboardLayout title="My Ideas" className={styles.Dashboard}>
			<Head>
				<title>My Ideas » Bulb</title>
				<meta name="description" content="My Ideas page" />
				<link rel="icon" href="/bulb-favicon.ico" />
			</Head>
			<IdeaList />
		</DashboardLayout>
	);
}

import Head from "next/head";
import DashboardLayout from "../../../templates/DashboardLayout";
import styles from "./Settings.module.scss";

export default function Settings() {
	return (
		<DashboardLayout title="Settings" className={styles.Settings}>
			<Head>
				<title>Settings » Bulb</title>
				<meta name="description" content="Settings page" />
				<link rel="icon" href="/bulb-favicon.ico" />
			</Head>
			Settings
		</DashboardLayout>
	);
}

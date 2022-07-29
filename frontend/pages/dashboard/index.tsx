import IdeaList from "../../components/IdeaList/IdeaList";
import DashboardLayout from "../../templates/DashboardLayout";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
	return (
		<DashboardLayout title="My Ideas" className={styles.Dashboard}>
			<IdeaList />
		</DashboardLayout>
	);
}

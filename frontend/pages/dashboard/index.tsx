import Head from "next/head";
import { MdAddCircleOutline } from "react-icons/md";
import IdeaList from "../../components/IdeaList/IdeaList";
import DashboardLayout, {
	TUtilityButton,
} from "../../templates/DashboardLayout";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
	const addIdea = () => {
		console.log("adding idea...");
	};
	const utilityButtons: TUtilityButton[] = [
		{
			label: (
				<>
					<MdAddCircleOutline /> add idea
				</>
			),
			onClick: () => addIdea(),
			variant: "primary",
			chip: true,
		},
	];
	return (
		<DashboardLayout
			title="My Ideas"
			className={styles.Dashboard}
			utilityButtons={utilityButtons}
		>
			<Head>
				<title>My Ideas » Bulb</title>
				<meta name="description" content="My Ideas page" />
				<link rel="icon" href="/bulb-favicon.ico" />
			</Head>
			<IdeaList />
		</DashboardLayout>
	);
}

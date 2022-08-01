import axios from "axios";
import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import Button from "../../components/Button/Button";
import IdeaList from "../../components/IdeaList/IdeaList";
import Input from "../../components/Input/Input";
import { useAuth } from "../../providers/AuthProvider";
import { useIdeas } from "../../providers/IdeaProvider";
import DashboardLayout, {
	TUtilityButton,
} from "../../templates/DashboardLayout";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
	const { user } = useAuth();
	const { ideas, getIdeas } = useIdeas();
	const [values, setValues] = useState({
		description: "",
	});
	const [formError, setFormError] = useState("");
	const openIdeaDropdown = () => {
		console.log("Open Idea Dropdown");
	};
	const addIdea = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("adding idea...");
		if (values.description) {
			await axios
				.post("/api/ideas/create", {
					userId: user?._id,
					idea: {
						description: values.description,
					},
				})
				.then((response) => {
					setFormError("");
					console.log("create idea response:", response.data);
					getIdeas();
				})
				.catch((err) => {
					console.log("create idea err", err);
					setFormError(err.response.data);
				});
		} else {
			setFormError("You must provide a description");
		}
	};
	const utilityButtons: TUtilityButton[] = [
		{
			label: (
				<>
					<MdAddCircleOutline /> add idea
				</>
			),
			onClick: () => openIdeaDropdown(),
			variant: "primary",
			chip: true,
		},
	];
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

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
			<form onSubmit={addIdea}>
				<Input
					type="description"
					name="description"
					required={true}
					setValue={handleChange}
					isFormValid={!formError}
					label="Idea description"
				/>
				{formError && <p>{formError}</p>}
				<Button type="submit">Add Idea</Button>
			</form>
			<IdeaList ideas={ideas} />
		</DashboardLayout>
	);
}

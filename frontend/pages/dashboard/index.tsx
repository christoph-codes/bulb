import axios from "axios";
import Head from "next/head";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { MdAddCircleOutline, MdCelebration } from "react-icons/md";
import Button from "../../components/Button/Button";
import IdeaList from "../../components/IdeaList/IdeaList";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";
import { useAuth } from "../../providers/AuthProvider";
import { useIdeas } from "../../providers/IdeaProvider";
import DashboardLayout, {
	TUtilityButton,
} from "../../templates/DashboardLayout";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
	const { user } = useAuth();
	const { ideas, getIdeas } = useIdeas();
	const [openIdeaDropdown, setOpenIdeaDropdown] = useState(false);
	const [values, setValues] = useState({
		description: "",
	});
	const [formError, setFormError] = useState("");
	const [modalContent, setModalContent] = useState<ReactNode>(null);
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
					setIsModalOpen(true);
					setModalContent(
						<>
							<MdCelebration />
							<h2>{response.data.message}</h2>
						</>
					);
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
			onClick: () => setOpenIdeaDropdown(!openIdeaDropdown),
			variant: "primary",
			chip: true,
		},
	];
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};
	const [isModalOpen, setIsModalOpen] = useState(false);

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
			<Modal open={isModalOpen}>{modalContent}</Modal>
			<form
				onSubmit={addIdea}
				className={
					styles[
						`Dashboard__addIdea${openIdeaDropdown ? "--open" : ""}`
					]
				}
			>
				<h2>Add a New Idea</h2>
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

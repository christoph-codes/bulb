import axios from "axios";
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useCallback,
} from "react";
import { useAuth } from "./AuthProvider";

export interface IIdeaProviderProps {
	children: ReactNode;
}

const IdeaContext = createContext<any>({});

const IdeaProvider = ({ children }: IIdeaProviderProps) => {
	const { user } = useAuth();
	const [ideas, setIdeas] = useState([]);
	const [ideasError, setIdeasError] = useState("");

	const getIdeas = useCallback(() => {
		axios
			.post("/api/ideas/user", { user: { id: user?._id } })
			.then(async (response) => {
				if (response.status === 200) {
					const data = await response.data.result;
					setIdeasError("");
					setIdeas(data);
				} else if (response.status === 401) {
					setIdeasError(response.data.response);
				}
			})
			.catch((err) => {
				console.error(err);
				setIdeasError(err.data.response);
			});
	}, [user]);

	useEffect(() => {
		getIdeas();
	}, []);

	return (
		<IdeaContext.Provider value={{ ideas, getIdeas, ideasError }}>
			{children}
		</IdeaContext.Provider>
	);
};

export const useIdeas = () => useContext(IdeaContext);

export default IdeaProvider;

import IdeaNote from "../IdeaNote/IdeaNote";
import styles from "./IdeaList.module.scss";

type TIdea = {
	name: string;
	description: string;
};
export interface IIdeaListProps {
	ideas: TIdea[];
}

const IdeaList = ({ ideas }: IIdeaListProps) => {
	return (
		<ul className={styles.IdeaList}>
			{ideas?.map((idea: TIdea, i: number) => {
				return (
					<li key={i}>
						<IdeaNote
							name={idea.name}
							description={idea.description}
						/>
					</li>
				);
			})}
		</ul>
	);
};

export default IdeaList;

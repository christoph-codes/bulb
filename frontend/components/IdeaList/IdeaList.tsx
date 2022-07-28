import IdeaNote from "../IdeaNote/IdeaNote";
import { useEffect, useState } from "react";
import router from "next/router";
import styles from "./IdeaList.module.scss";
import axios from "axios";
import { useAuth } from "../../providers/AuthProvider";

type Idea = {
  name: string;
  description: string;
};

const IdeaList = () => {
  const { user } = useAuth();
  const [ideaList, setIdeaList] = useState([]);

  const getIdeasFromApi = () => {
    axios
      .post("/api/ideas/user", { user: { id: user?._id } })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.data.result;
          setIdeaList(data);
        } else if (response.status === 401) {
          router.push("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getIdeasFromApi();
  }, []);

  return (
    <ul className={styles.IdeaList}>
      {ideaList.map((idea: Idea, i: number) => {
        return (
          <li key={i}>
            <IdeaNote name={idea.name} description={idea.description} />
          </li>
        );
      })}
    </ul>
  );
};

export default IdeaList;

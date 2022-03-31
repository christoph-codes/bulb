import IdeaNote from '../IdeaNote/IdeaNote';
import { useEffect, useState } from 'react';
import router from 'next/router';
import styles from '../../styles/List.module.sass';

type Idea = {
  name: string;
  description: string;
};

const IdeaList = () => {
  const [ideaList, setIdeaList] = useState([]);

  const getIdeasFromApi = () => {
    fetch('/api/ideas', { method: 'GET' })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          setIdeaList(data);
        } else if (response.status === 401) {
          router.push('/');
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
    <ul className={styles.list}>
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
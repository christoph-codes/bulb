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

  const getRandomNumBetween = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  useEffect(() => {
    getIdeasFromApi();
  }, []);

  return (
    <ul className={styles.list}>
      {ideaList.map((idea: Idea, i: number) => {
        const rotation = getRandomNumBetween(-3, 3);
        return (
          <li key={i} style={{ transform: `rotate(${rotation}deg)` }}>
            <IdeaNote name={idea.name} description={idea.description} />
          </li>
        );
      })}
    </ul>
  );
};

export default IdeaList;

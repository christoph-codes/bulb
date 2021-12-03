import IdeaCard from '../IdeaCard/IdeaCard';
import { useEffect, useState } from 'react';
import router from 'next/router';
import styles from '../../styles/List.module.sass';

const IdeaList = () => {
  const [ideaList, setIdeaList] = useState([]);

  const getIdeas = () => {
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
    getIdeas();
  }, []);

  return (
    <ul className={styles.list} tabIndex={0}>
      {ideaList.map((idea, i) => {
        return (
          <li>
            <IdeaCard name={idea.name} position={i} key={i} />
          </li>
        );
      })}
    </ul>
  );
};

export default IdeaList;

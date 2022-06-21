import IdeaNote from '../IdeaNote/IdeaNote';
import { useEffect, useState, useRef } from 'react';
import router from 'next/router';
import styles from '../../styles/List.module.sass';

interface IIdeaList {
  isList: boolean;
}

type Idea = {
  name: string;
  description: string;
};

const IdeaList = ({ isList }: IIdeaList) => {
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

  const ideaMap = ideaList.map((idea: Idea, i: number) => {
    return (
      <IdeaNote
        name={idea.name}
        description={idea.description}
        isList={isList}
        key={i}
      />
    );
  });

  return isList ? (
    <table className={styles.list}>
      <thead>
        <tr>
          <th>Category</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>{ideaMap}</tbody>
    </table>
  ) : (
    <ul className={styles.board}>{ideaMap}</ul>
  );
};

export default IdeaList;

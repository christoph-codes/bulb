import IdeaCard from '../IdeaCard/IdeaCard';
import { useEffect, useState } from 'react';

const IdeaList = () => {
  const [ideaList, setIdeaList] = useState([]);

  const getIdeas = () => {
    setIdeaList(['Laptarp®', 'Ideaverse']);
  };

  useEffect(() => {
    getIdeas();
  }, []);

  return (
    <ul>
      {ideaList.map((idea, i) => {
        return (
          <li>
            <IdeaCard name={idea} position={i} key={i} />
          </li>
        );
      })}
    </ul>
  );
};

export default IdeaList;

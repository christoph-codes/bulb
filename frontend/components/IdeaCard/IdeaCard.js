import { useEffect, useState } from 'react';
import styles from '../../styles/Card.module.sass';

const IdeaCard = ({ name, description, position }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const delay = 100 + 100 * position;

    setTimeout(() => {
      setIsLoaded(true);
    }, delay);
  }, []);

  return (
    <div className={styles.card + (!isLoaded ? ` ${styles.loading}` : '')}>
      <h2>{name}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default IdeaCard;

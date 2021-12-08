import { useEffect, useState } from 'react';
import styles from '../../styles/Note.module.sass';

const IdeaNote = ({ name, description, position }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const delay = 100 + 100 * position;

    setTimeout(() => {
      setIsLoaded(true);
    }, delay);
  }, []);

  return (
    <div className={styles.note + (!isLoaded ? ` ${styles.loading}` : '')}>
      <h2>{name}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default IdeaNote;

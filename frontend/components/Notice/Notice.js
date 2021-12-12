import styles from '../../styles/Notice.module.sass';

const Notice = ({ message, setMessage }) => {
  return (
    <div className={styles.Notice}>
      <h2>{message}</h2>
      <span onClick={() => setMessage(null)}>X</span>
    </div>
  );
};

export default Notice;

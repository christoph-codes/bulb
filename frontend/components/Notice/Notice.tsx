import styles from '../../styles/Notice.module.sass';

interface INoticeProps {
  message: string;
  setMessage: Function;
}

const Notice = ({ message, setMessage }: INoticeProps) => {
  return (
    <div className={styles.Notice}>
      <h2>{message}</h2>
      <span onClick={() => setMessage(null)}>X</span>
    </div>
  );
};

export default Notice;

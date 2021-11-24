import styles from '../../styles/Login.module.sass';

const Input = ({ type, name, required }) => {
  return (
    <input
      className={styles.creds}
      type={type}
      name={name}
      required={required}
      maxLength={25}
    />
  );
};

export default Input;

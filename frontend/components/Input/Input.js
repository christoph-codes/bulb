import styles from '../../styles/Login.module.sass';

const Input = ({ type, name, required, setValue, isFormValid, label }) => {
  return (
    <>
      {label && (
        <>
          <label htmlFor={name}>
            <b>{label}</b>
          </label>
          <br />
        </>
      )}
      <input
        className={styles.creds + ' ' + (!isFormValid && styles.invalidInput)}
        type={type}
        name={name}
        required={required}
        onChange={(e) => setValue(e.target.value)}
        maxLength={25}
      />
    </>
  );
};

export default Input;

import styles from '../../styles/Input.module.sass';

const Input = ({ type, name, required, setValue, isFormValid, label }) => {
  return (
    <>
      {label && (
        <label className={styles.label} htmlFor={name}>
          <b>{label}:</b>
        </label>
      )}
      &nbsp;
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

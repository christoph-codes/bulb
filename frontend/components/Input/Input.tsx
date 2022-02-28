import React from 'react';
import styles from '../../styles/Input.module.sass';

interface InputProps {
  type: string;
  name: string;
  required: boolean;
  setValue: Function;
  isFormValid: boolean;
  label: string;
}

const Input = ({
  type,
  name,
  required,
  setValue,
  isFormValid,
  label,
}: InputProps) => {
  return (
    <div className={styles.input}>
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
        maxLength={40}
      />
    </div>
  );
};

export default Input;

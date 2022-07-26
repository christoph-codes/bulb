import React from "react";
import styles from "./Input.module.scss";

interface IInputProps {
  type: string;
  name: string;
  required: boolean;
  setValue: Function;
  isFormValid: boolean;
  label: string;
}
/**
 * Displays a bulb styled input component
 * @component Input
 * @param {string} type  The desired type of input
 * @param {string} name The unique name to be provided to the input
 * @param {boolean} required Boolean value to determine if the input is required for submission
 * @param {Function} setValue Function to set the value of the input
 * @param {boolean} isFormValid Boolean that displays a error state to style the component
 * @param {string} label Label for the component
 * @returns The value that is entered into the input
 */
const Input = ({
  type = "text",
  name,
  required,
  setValue,
  isFormValid,
  label,
}: IInputProps) => {
  return (
    <label className={styles.Input} htmlFor={name}>
      <span>
        <strong>{label}:</strong>
      </span>
      <input
        className={
          styles.creds + " " + (!isFormValid && styles["Input--invalid"])
        }
        type={type}
        name={name}
        required={required}
        onChange={(e) => setValue(e)}
      />
    </label>
  );
};

export default Input;

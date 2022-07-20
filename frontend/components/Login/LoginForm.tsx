import React, { ChangeEvent, FormEvent } from "react";
import styles from "../../styles/Login.module.sass";
import { useState } from "react";
import Input from "../Input/Input";
import { useRouter } from "next/router";
import { MdLightbulb } from "react-icons/md";
import axios from "axios";

interface ILoginProps {
  setMessage: Function;
}

const LoginForm = ({ setMessage }: ILoginProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [formError, setFormError] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmpw: "",
    email: "",
  });

  const redirectToDashboard = (userData: object) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    router.push("/dashboard");
  };

  const submitLoginCreds = () => {
    setIsSubmitting(true);
    const request = {
      email: values.email,
      password: values.password,
    };
    axios
      .post("/api/login", { body: JSON.stringify(request) })
      .then(async (response) => {
        console.log("response:", response);
        if (response.status === 200) {
          const data = await response.data;
          redirectToDashboard(data);
        } else if (response.status === 401) {
          setFormError(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setFormError(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const submitAccountCreation = () => {
    setIsSubmitting(true);
    const request = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    axios
      .post("/api/auth/create", {
        body: request,
      })
      .then(async (response) => {
        console.log("create response", response);
        if (response.status === 200) {
          setMessage(
            "Your account has been created! Please check your email for verification."
          );
          setIsCreatingAccount(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setFormError(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const validateForm = () => {
    const isCredsFilled = values.username && values.password;
    const isAccountCredsFilled =
      values.confirmpw === values.password && values.email;

    if (!isCredsFilled || (isCreatingAccount && !isAccountCredsFilled)) {
      setFormError(true);
      return false;
    }

    setFormError(false);
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    const request = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    console.log("submission commenced");
    submitLoginCreds();

    axios
      .post("/api/auth/create", {
        user: request,
      })
      .then(async (response) => {
        console.log("create response", response);
        if (response.status === 200) {
          setMessage(
            "Your account has been created! Please check your email for verification."
          );
          setIsCreatingAccount(false);
        }
      })
      .catch((err) => {
        console.error(err.data);
        setFormError(err.data);
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    // const isFormValid = validateForm();
    // if (isFormValid) {
    //   isCreatingAccount ? submitAccountCreation() : submitLoginCreds();
    // }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("hey");
    const { name, value } = e.target;
    console.log("name", name);
    setValues({ ...values, [name]: value });
  };

  return (
    <div className={styles.LoginForm}>
      <form
        className={
          styles.form + (isCreatingAccount ? ` ${styles.revealed}` : "")
        }
      >
        <section className={styles.loginSection}>
          <div className={styles.bulb}>💡</div>
          <br />
          <Input
            type="email"
            name="email"
            required={true}
            setValue={handleChange}
            isFormValid={!formError}
            label="Email"
          />
          <br />
          <Input
            type="password"
            name="password"
            required={true}
            setValue={handleChange}
            isFormValid={!formError}
            label="Password"
          />
        </section>
        <div className={styles.loginActions}>
          <button
            className={styles.loginButton}
            onClick={handleSubmit}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <MdLightbulb /> : "Log In"}
          </button>
          <p
            onClick={() => {
              setIsCreatingAccount(true);
            }}
          >
            <span className={styles.formToggle}>Create an account</span>
          </p>
        </div>
        <section
          className={
            styles.accountSection +
            " " +
            (!isCreatingAccount ? styles.hidden : "")
          }
        >
          <Input
            type="password"
            name="confirm-psw"
            required={true}
            setValue={handleChange}
            isFormValid={!formError}
            label="Confirm PW"
          />
          <br />
          <Input
            type="text"
            name="username"
            required={true}
            setValue={handleChange}
            isFormValid={!formError}
            label="username"
          />
          <div className={styles.accountActions}>
            <button
              className={styles.accountButton}
              onClick={handleSubmit}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <MdLightbulb /> : "Create Account"}
            </button>
            <p
              onClick={() => {
                setIsCreatingAccount(false);
              }}
            >
              <span className={styles.formToggle}>Back to Login</span>
            </p>
            <div className={styles.bulb}>💡</div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default LoginForm;

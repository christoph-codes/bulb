import React, { ChangeEvent, FormEvent } from "react";
import styles from "./LoginForm.module.scss";
import { useState } from "react";
import Input from "../Input/Input";
import { useRouter } from "next/router";
import { MdLightbulb } from "react-icons/md";
import axios from "axios";
import Button from "../Button/Button";
import { useAuth } from "../../providers/AuthProvider";

const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [formError, setFormError] = useState("");
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
    console.log("logging in");
    setIsSubmitting(true);
    const request = {
      email: values.email,
      password: values.password,
    };
    axios
      .post("/api/auth/login", request)
      .then(async (response) => {
        console.log("response:", response);
        if (response.status === 200) {
          const data = await response.data;
          redirectToDashboard(data);
        } else if (response.status === 401) {
          setFormError("You are not authorized for this");
        }
      })
      .catch((err) => {
        console.log("err", err);
        setFormError(err.response.data.error.message);
      })
      .finally(() => {
        console.log("promised!!");
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
        user: request,
      })
      .then(async (response) => {
        console.log("create response", response);
        if (response.status === 200) {
          console.log(
            "Your account has been created! Please check your email for verification.",
            response
          );
          setIsCreatingAccount(false);
        }
      })
      .catch((err) => {
        const { error } = err.response.data;
        if (error) {
          setFormError(error.message);
        }
        console.error(err.response.data.error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const validateForm = () => {
    console.log("validating...");
    console.log("values", values);
    const isCredsFilled = values.email && values.password;
    const doPasswordsMatch = values.confirmpw === values.password;

    if (!isCredsFilled || (isCreatingAccount && !doPasswordsMatch)) {
      setFormError("You must fill in all required fields");
      console.log("isValid", false);
      return false;
    } else {
      setFormError("");
      console.log("isValid", true);
      return true;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log("submitting");
    e.preventDefault();
    setIsSubmitting(true);

    let isFormValid = validateForm();
    if (isFormValid) {
      isCreatingAccount ? submitAccountCreation() : submitLoginCreds();
    }
  };
  /**
   * Updates the state of the login form values
   * @param e Input HTML Change event
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        styles.LoginForm + (isCreatingAccount ? ` ${styles.revealed}` : "")
      }
    >
      <section className={styles.LoginForm__loginSection}>
        <Input
          type="email"
          name="email"
          required={true}
          setValue={handleChange}
          isFormValid={!formError}
          label="Email"
        />
        <Input
          type="password"
          name="password"
          required={true}
          setValue={handleChange}
          isFormValid={!formError}
          label="Password"
        />
        {isCreatingAccount && (
          <>
            <Input
              type="password"
              name="confirmpw"
              required={true}
              setValue={handleChange}
              isFormValid={!formError}
              label="Confirm PW"
            />
            <Input
              type="text"
              name="username"
              required={true}
              setValue={handleChange}
              isFormValid={!formError}
              label="Unique username"
            />
          </>
        )}
        {formError && (
          <p className={styles.LoginForm__formError}>{formError}</p>
        )}
        <Button className={styles.LoginForm__loginButton} type="submit">
          {isCreatingAccount ? (
            "Create Account"
          ) : isSubmitting ? (
            <MdLightbulb />
          ) : (
            "Log In"
          )}
        </Button>
      </section>
      <section className={styles.LoginForm__formToggle}>
        <Button
          variant="ghost-light"
          onClick={() => setIsCreatingAccount(!isCreatingAccount)}
        >
          {!isCreatingAccount
            ? "Need to create an account?"
            : "Already have an account?"}
        </Button>
      </section>
    </form>
  );
};

export default LoginForm;

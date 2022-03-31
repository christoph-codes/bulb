import React from 'react';
import styles from '../../styles/Login.module.sass';
import { useState } from 'react';
import Input from '../Input/Input';
import { useRouter } from 'next/router';
import { MdLightbulb } from 'react-icons/md';

interface ILoginProps {
  setMessage: Function;
}

const LoginForm = ({ setMessage }: ILoginProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [formError, setFormError] = useState(false);
  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmpw: '',
    email: '',
  });

  const redirectToDashboard = (userData: object) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    router.push('/dashboard');
  };

  const submitLoginCreds = () => {
    setIsSubmitting(true);
    const request = {
      username: values.username,
      password: values.password,
    };
    fetch('/api/login', { method: 'POST', body: JSON.stringify(request) })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
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
      fname: values.username,
      lname: values.username,
      email: values.email,
      password: values.password,
    };

    fetch('/api/createAccount', {
      method: 'POST',
      body: JSON.stringify(request),
    })
      .then(async (response) => {
        if (response.status === 200) {
          setMessage(
            'Your account has been created! Please check your email for verification.'
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

    const isFormValid = validateForm();
    if (isFormValid) {
      isCreatingAccount ? submitAccountCreation() : submitLoginCreds();
    }
  };

  const handleChange = (fieldName: string) => (value: string) => {
    setValues({ ...values, [fieldName]: value });
  };

  return (
    <div className={styles.LoginForm}>
      <form
        className={
          styles.form + (isCreatingAccount ? ` ${styles.revealed}` : '')
        }
      >
        <section className={styles.loginSection}>
          <div className={styles.bulb}>💡</div>
          <br />
          <Input
            type='text'
            name='uname'
            required={true}
            setValue={handleChange('username')}
            isFormValid={!formError}
            label='Username'
          />
          <br />
          <Input
            type='password'
            name='psw'
            required={true}
            setValue={handleChange('password')}
            isFormValid={!formError}
            label='Password'
          />
        </section>
        <div className={styles.loginActions}>
          <button
            className={styles.loginButton}
            onClick={handleSubmit}
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? <MdLightbulb /> : 'Log In'}
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
            ' ' +
            (!isCreatingAccount ? styles.hidden : '')
          }
        >
          <Input
            type='password'
            name='confirm-psw'
            required={true}
            setValue={handleChange('confirmpw')}
            isFormValid={!formError}
            label='Confirm PW'
          />
          <br />
          <Input
            type='text'
            name='email'
            required={true}
            setValue={handleChange('email')}
            isFormValid={!formError}
            label='Email'
          />
          <div className={styles.accountActions}>
            <button
              className={styles.accountButton}
              onClick={handleSubmit}
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? <MdLightbulb /> : 'Create Account'}
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

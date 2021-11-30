import styles from '../../styles/Login.module.sass';
import { useState, useEffect } from 'react';
import Input from '../Input/Input';
import { useRouter } from 'next/router';
import { MdLightbulbOutline } from 'react-icons/md';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setisFormValid] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const redirectToUserPage = (userData) => {
    router.push('/user');
  };

  const submitCreds = () => {
    if (!username || !password) {
      setisFormValid(false);
      return;
    }

    setisFormValid(true);
    setIsSubmitting(true);

    const request = { username: username, password: password };
    fetch('/api/login', { method: 'POST', body: request })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          redirectToUserPage(data);
        } else if (response.status === 401) {
          highlightInputs();
        }
      })
      .then((data) => onSuccess(data))
      .catch((err) => {
        console.error(err);
        setisFormValid(false);
        setIsSubmitting(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCreds();
  };
  return (
    <form className={styles.form}>
      <span className={styles.loginText}>Log in</span>
      <div className={styles.username}>
        <Input
          type='text'
          name='uname'
          required={true}
          setValue={setUsername}
          isFormValid={isFormValid}
          label='Username'
        />
      </div>
      <div className={styles.password}>
        <Input
          type='password'
          name='psw'
          required={true}
          setValue={setPassword}
          isFormValid={isFormValid}
          label='Password'
        />
      </div>
      <button
        className={styles.loginButton}
        onClick={handleSubmit}
        type='submit'
      >
        -&gt;
      </button>
      <span
        className={
          styles.lightController +
          ' ' +
          (isSubmitting ? styles.submitLight : isLoaded && styles.loadedLight)
        }
      ></span>

      <span className={styles.spinner}>
        <MdLightbulbOutline />
      </span>
    </form>
  );
};

export default LoginForm;

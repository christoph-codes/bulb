import styles from '../../styles/Login.module.sass';
import { useState, useEffect } from 'react';
import Input from '../Input/Input';
import { useRouter } from 'next/router';
import { MdLightbulb } from 'react-icons/md';

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

  const redirectToDashboard = (userData) => {
    sessionStorage.setItem('user', userData);
    router.push('/dashboard');
  };

  const submitCreds = () => {
    if (!username || !password) {
      setisFormValid(false);
      return;
    }

    setisFormValid(true);
    setIsSubmitting(true);

    // setTimeout(() => setIsSubmitting(false), 2000);

    const request = { username: username, password: password };
    fetch('/api/login', { method: 'POST', body: request })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          redirectToDashboard(data);
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
    <>
      <form
        className={styles.form + (isSubmitting ? ` ${styles.submitting}` : '')}
      >
        <div>💡</div>
        <br />
        <Input
          type='text'
          name='uname'
          required={true}
          setValue={setUsername}
          isFormValid={isFormValid}
          label='Username'
        />
        <br />
        <br />
        <Input
          type='password'
          name='psw'
          required={true}
          setValue={setPassword}
          isFormValid={isFormValid}
          label='Password'
        />
        <br />
        <br />
      </form>

      <button
        className={styles.loginButton}
        onClick={handleSubmit}
        type='submit'
        disabled={isSubmitting}
      >
        {isSubmitting ? <MdLightbulb /> : 'Log in'}
      </button>
      <p>Create an account</p>
    </>
  );
};

export default LoginForm;

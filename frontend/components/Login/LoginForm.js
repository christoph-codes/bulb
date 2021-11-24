import styles from '../../styles/Login.module.sass';
import { useState, useEffect } from 'react';
import Input from '../Input/Input';

const LoginForm = () => {
  const [isUsernameFilled, setIsUsernameFilled] = useState(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const submitCreds = () => {
    if (!isUsernameFilled || !isPasswordFilled) {
      return;
    }

    fetch('/api/login')
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <form className={styles.form} method='post'>
      <div className={styles.username}>
        <label for='uname'>
          <b>Username</b>
        </label>
        <br />
        <Input
          type='text'
          name='uname'
          required={true}
          onChange={setIsUsernameFilled}
        />
      </div>
      <div className={styles.password}>
        <label for='psw'>
          <b>Password</b>
        </label>
        <br />
        <Input
          type='password'
          name='psw'
          required={true}
          onChange={setIsPasswordFilled}
        />
      </div>
      <br />
      <p className={styles.loginText}>Login?</p>
      <button
        className={styles.loginButton}
        onClick={submitCreds}
        type='submit'
      >
        -&gt;
      </button>
      <span
        className={
          styles.lightController + ' ' + (isLoaded && styles.animateLight)
        }
      ></span>
    </form>
  );
};

export default LoginForm;

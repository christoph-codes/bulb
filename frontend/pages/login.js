import LoginForm from '../components/Login/LoginForm';
import styles from '../styles/Login.module.sass';

export default function Login() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}

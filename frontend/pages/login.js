import fullColorLogo from '../public/logo-full-color.png';
import Image from 'next/image';
import Head from 'next/head';
import LoginForm from '../components/Login/LoginForm';
import styles from '../styles/Login.module.sass';

export default function Login() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Log In</title>
        <meta name='description' content='Log in page' />
        <link rel='icon' href='/bulb-favicon.ico' />
      </Head>

      <main className={styles.main}>
        <LoginForm />
      </main>

      <footer className={styles.footer}>
        <span className={styles.logo}>
          <Image src={fullColorLogo} alt='bulb Logo' width={144} height={64} />
        </span>
      </footer>
    </div>
  );
}

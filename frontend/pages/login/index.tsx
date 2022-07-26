import Image from "next/image";
import Head from "next/head";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./Login.module.scss";

export default function Login() {
  return (
    <div className={styles.Login}>
      <Head>
        <title>Log In</title>
        <meta name="description" content="Log in page" />
        <link rel="icon" href="/bulb-favicon.ico" />
      </Head>

      <main className={styles.Login__main}>
        <div className={styles.Login__logo}>
          <Image
            src="/bulb_light_color.svg"
            alt="bulb Logo"
            width={144}
            height={64}
          />
        </div>
        <LoginForm />
        <div className={styles.Login__bulb}>💡 Bulb. All Rights Reserved.</div>
      </main>
    </div>
  );
}

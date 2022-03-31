import styles from '../styles/Dashboard.module.sass';
import fullColorLogo from '../public/logo-full-color.png';
import Head from 'next/head';
import Image from 'next/image';
import IdeaList from '../components/IdeaList/IdeaList';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Explore bulb</title>
        <meta name='description' content='Dashboard page' />
        <link rel='icon' href='/bulb-favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Here are your current Ideas:</h1>
        <IdeaList />
      </main>

      <footer className={styles.footer}>
        <span className={styles.logo}>
          <Image src={fullColorLogo} alt='bulb Logo' width={144} height={64} />
        </span>
      </footer>
    </div>
  );
}

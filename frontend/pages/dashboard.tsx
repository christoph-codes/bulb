import styles from '../styles/Dashboard.module.sass';
import { useState } from 'react';
import fullColorLogo from '../public/logo-full-color.png';
import Head from 'next/head';
import Image from 'next/image';
import IdeaList from '../components/IdeaList/IdeaList';
import { MdReorder, MdStickyNote2 } from 'react-icons/md';

export default function Dashboard() {
  const [isList, setIsList] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Explore bulb</title>
        <meta name='description' content='Dashboard page' />
        <link rel='icon' href='/bulb-favicon.ico' />
      </Head>

      <button
        className={styles.toggle}
        onClick={() => {
          setIsList(!isList);
        }}
      >
        <span className={styles.toggleHighlight}></span>
        <MdStickyNote2 />
        <MdReorder />
      </button>
      <main className={styles.main}>
        <h1 className={styles.title}>Here are your current Ideas:</h1>
        <IdeaList isList={isList} />
      </main>

      <footer className={styles.footer}>
        <span className={styles.logo}>
          <Image src={fullColorLogo} alt='bulb Logo' width={144} height={64} />
        </span>
      </footer>
    </div>
  );
}

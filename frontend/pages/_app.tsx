import '../styles/globals.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface IMyAppProps {
  Component: React.ComponentClass;
  pageProps: ButtonProps;
}

function MyApp({ Component, pageProps }: IMyAppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

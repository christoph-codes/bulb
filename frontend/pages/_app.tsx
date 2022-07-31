import AuthProvider from "../providers/AuthProvider";
import EmulatorProvider from "../providers/EmulatorProvider";
import "../styles/globals.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface IMyAppProps {
	Component: React.ComponentClass;
	pageProps: ButtonProps;
}

function MyApp({ Component, pageProps }: IMyAppProps) {
	return (
		<EmulatorProvider>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</EmulatorProvider>
	);
}

export default MyApp;

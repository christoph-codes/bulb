import '../styles/globals.css';
import { AuthProvider } from '../providers/auth';

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;

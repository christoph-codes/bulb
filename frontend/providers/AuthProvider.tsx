import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import {
	createContext,
	useState,
	useEffect,
	useContext,
	Dispatch,
	SetStateAction,
} from 'react';
import auth from '../config/firebase/firebaseClient';
import { getWithExpiry, setWithExpiry } from '../utils/helper';

export interface IAuthContext {
	user: IUser | null;
	setUser: Dispatch<SetStateAction<IUser | null>>;
	logout: () => void;
}
export interface IUser {
	_id?: string;
	username?: string;
	fname?: string;
	lname?: string;
	email?: string;
	githubUrl?: string;
	jobTitle?: string;
	bio?: string;
	lastLoggedInDate?: Date | null;
}

const AuthContext = createContext<IAuthContext>({
	user: {
		_id: '',
		username: '',
		fname: '',
		lname: '',
		email: '',
		githubUrl: '',
		jobTitle: '',
		bio: '',
		lastLoggedInDate: null,
	},
	setUser: () => {},
	logout: () => {},
});

const AuthProvider = ({ children }: any) => {
	const router = useRouter();
	const [user, setUser] = useState<IUser | null>(() => {
		const localUser: IUser = getWithExpiry('bulb_user');
		return (
			localUser || {
				_id: '',
				username: '',
				fname: '',
				lname: '',
				email: '',
				githubUrl: '',
				jobTitle: '',
				bio: '',
				lastLoggedInDate: '',
			}
		);
	});
	useEffect(() => {
		setWithExpiry('bulb_user', user, 3600000);
	}, [user]);

	useEffect(() => {
		if (!user?._id) {
			router.push('/login');
		}
	}, []);

	const logout = () => {
		signOut(auth).then((data) => {
			console.log('signout data', data);
			setUser({
				_id: '',
				username: '',
				fname: '',
				lname: '',
				email: '',
				githubUrl: '',
				jobTitle: '',
				bio: '',
			});
		});
	};

	return (
		<AuthContext.Provider value={{ user, setUser, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

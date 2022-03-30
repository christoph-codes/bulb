import { createContext, useContext, useState } from 'react';
import BULB_API from '../config/api';

const AuthContext = createContext({
	isAuthenticated: false,
	user: {},
	login: () => {},
	logout: () => {},
	createAccount: () => {},
	updateAccount: () => {},
	deleteAccount: () => {},
	updateUser: () => {},
	updatePassword: () => {},
});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState({
		isAuthenticated: false,
		data: {},
	});
	const [error, setError] = useState(null);
	const login = (email, password) => {
		console.log(email, password);
		if (email && password) {
			BULB_API.post('/auth/login', { email, password })
				.then((res) => {
					console.log('login result', res);
					if (res.data) {
						setUser({
							isAuthenticated: true,
							data: res.data.user,
						});
					}
					if (res.error) {
						console.log('API Error:', res.error);
					}
				})
				.catch((err) => {
					console.log('error:', err);
					setError(err);
				});
		}
	};
	const createAccount = (fname, lname, email, password) => {
		if (fname && lname && email && password) {
			BULB_API.post('/createAccount', {
				fname,
				lname,
				email,
				password,
			})
				.then((res) => {
					if (res.status === 201) {
						setUser(res.data.user);
						console.log(res.data);
					} else {
						setError(
							'something went wrong creating this user',
							res.data,
						);
					}
				})
				.catch((err) => {
					setError(err);
				});
		} else {
			setError('missing info');
		}
	};
	const updateAccount = () => {
		console.log('Update Account');
	};
	const logout = () => {
		console.log('logging out');
		BULB_API.get('/auth/logout')
			.then((res) => {
				console.log('logout result:', res.data);
				if (res.data) {
					setUser({
						isAuthenticated: false,
						data: {},
					});
				}
			})
			.catch((err) => {
				setError(err);
			});
	};
	return (
		<AuthContext.Provider
			value={{
				isUserAuthenticated: user.isAuthenticated,
				user: user.data,
				login,
				logout,
				createAccount,
				updateAccount,
				error,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState } from 'react';
import BULB_API from '../config/api';

const AuthContext = createContext({
	isAuthenticated: false,
	user: {},
	login: () => {},
	logout: () => {},
	createAccount: () => {},
	deleteAccount: () => {},
	updateUser: () => {},
	updatePassword: () => {},
});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState({
		isAuthenticated: false,
		data: {},
	});
	const login = (email, password) => {
		console.log(email, password);
		if (email && password) {
			BULB_API.post('/auth/login', { email, password })
				.then((res) => {
					console.log(res.data);
					// if (res.data) {
					// 	setUser({
					// 		isAuthenticated: true,
					// 		data: res.data.data,
					// 	});
					// }
				})
				.catch((err) => {
					console.log(err);
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
						console.log(
							'something went wrong creating this user',
							res.data,
						);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			console.log('missing info');
		}
	};
	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				createAccount,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

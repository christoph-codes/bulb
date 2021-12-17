import { useState } from 'react';
import { useAuth } from '../providers/auth';
import styles from '../styles/Apis.module.scss';

const Apis = ({ props }) => {
	const { login, createAccount } = useAuth();
	const [loginFormInputs, setLoginFormInputs] = useState({
		email: '',
		password: '',
	});
	const [createAccountFormInputs, setCreateAccountFormInputs] = useState({
		fname: '',
		lname: '',
		email: '',
		password: '',
	});
	const update = (e, inputs, setFunction) => {
		const {
			target: { name, value },
		} = e;
		setFunction({ ...inputs, [name]: value });
	};
	const validate = (e) => {
		console.log(e.target.value === 'hello');
	};
	return (
		<div className={styles.Api}>
			<h1>API Functions</h1>
			<div className={styles.Api__cards}>
				<article className={styles.Api__cards__card}>
					<h2>Login</h2>
					{/* Testing the login function. TODO: Delete this */}
					<input
						type='text'
						name='email'
						value={loginFormInputs.email}
						onChange={(e) =>
							update(e, loginFormInputs, setLoginFormInputs)
						}
						onBlur={(e) => validate(e)}
					/>
					<input
						type='text'
						name='password'
						value={loginFormInputs.password}
						onChange={(e) =>
							update(e, loginFormInputs, setLoginFormInputs)
						}
						onBlur={(e) => validate(e)}
					/>
					<button
						onClick={() =>
							login(
								loginFormInputs.email,
								loginFormInputs.password,
							)
						}
					>
						Login
					</button>
				</article>
			</div>
			<div className={styles.Api__cards}>
				<article className={styles.Api__cards__card}>
					<h2>Create Account</h2>
					{/* Testing the login function. TODO: Delete this */}
					<input
						type='text'
						name='fname'
						value={createAccountFormInputs.fname}
						onChange={(e) =>
							update(
								e,
								createAccountFormInputs,
								setCreateAccountFormInputs,
							)
						}
						onBlur={(e) => validate(e)}
					/>
					<input
						type='text'
						name='lname'
						value={createAccountFormInputs.lname}
						onChange={(e) =>
							update(
								e,
								createAccountFormInputs,
								setCreateAccountFormInputs,
							)
						}
						onBlur={(e) => validate(e)}
					/>
					<input
						type='text'
						name='email'
						value={createAccountFormInputs.email}
						onChange={(e) =>
							update(
								e,
								createAccountFormInputs,
								setCreateAccountFormInputs,
							)
						}
						onBlur={(e) => validate(e)}
					/>
					<input
						type='text'
						name='password'
						value={createAccountFormInputs.password}
						onChange={(e) =>
							update(
								e,
								createAccountFormInputs,
								setCreateAccountFormInputs,
							)
						}
						onBlur={(e) => validate(e)}
					/>
					<button
						onClick={() =>
							createAccount(
								createAccountFormInputs.fname,
								createAccountFormInputs.lname,
								createAccountFormInputs.email,
								createAccountFormInputs.password,
							)
						}
					>
						Login
					</button>
				</article>
			</div>
		</div>
	);
};

export default Apis;

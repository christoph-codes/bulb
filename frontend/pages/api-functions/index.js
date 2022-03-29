import { useRef, useState } from 'react';
import { useAuth } from '../../providers/auth';
import styles from './api-functions.module.scss';

const Apis = ({ props }) => {
	const { login, createAccount, user, error } = useAuth();
	const [result, setResult] = useState({});
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
	const [updateAccountFormInputs, setUpdateAccountFormInputs] = useState({
		fname: user.fname,
		lname: user.lname,
		email: user.email,
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
			{error && <p>{JSON.stringify(error)}</p>}
			<div className={styles.Api__cards}>
				<article className={styles.Api__cards__card}>
					<h2>Login</h2>
					{/* Testing the login function. TODO: Delete this */}
					<input
						type='text'
						name='email'
						placeholder='Email'
						value={loginFormInputs.email}
						onChange={(e) =>
							update(e, loginFormInputs, setLoginFormInputs)
						}
						onBlur={(e) => validate(e)}
					/>
					<input
						type='password'
						name='password'
						placeholder='Password'
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
					<h4>Result:</h4>
					{result && JSON.stringify(result)}
				</article>
			</div>
			<div className={styles.Api__cards}>
				<article className={styles.Api__cards__card}>
					<h2>Create Account</h2>
					{/* Testing the login function. TODO: Delete this */}
					<input
						type='text'
						name='fname'
						placeholder='First Name'
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
						placeholder='Last Name'
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
						placeholder='Email'
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
						type='password'
						name='password'
						placeholder='Password'
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
						Create Account
					</button>
				</article>
			</div>
			<div className={styles.Api__cards}>
				<article className={styles.Api__cards__card}>
					<h2>Update Account</h2>
					{/* Testing the login function. TODO: Delete this */}
					<input
						type='text'
						name='fname'
						placeholder='First Name'
						value={updateAccountFormInputs.fname}
						onChange={(e) =>
							update(
								e,
								updateAccountFormInputs,
								setUpdateAccountFormInputs,
							)
						}
						onBlur={(e) => validate(e)}
					/>
					<input
						type='text'
						name='lname'
						placeholder='Last Name'
						value={updateAccountFormInputs.lname}
						onChange={(e) =>
							update(
								e,
								updateAccountFormInputs,
								setUpdateAccountFormInputs,
							)
						}
						onBlur={(e) => validate(e)}
					/>
					<input
						type='text'
						name='email'
						placeholder='Email'
						value={updateAccountFormInputs.email}
						onChange={(e) =>
							update(
								e,
								updateAccountFormInputs,
								setUpdateAccountFormInputs,
							)
						}
						onBlur={(e) => validate(e)}
					/>
					<button
						onClick={() =>
							updateAccount(
								updateAccountFormInputs.fname,
								updateAccountFormInputs.lname,
								updateAccountFormInputs.email,
							)
						}
					>
						Update Account
					</button>
				</article>
			</div>
		</div>
	);
};

export default Apis;

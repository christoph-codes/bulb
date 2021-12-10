const { fireAuth, auth } = require('../config/firebase');
const db = require('../config/mongodb');

const authCheck = async (req, res, next) => {
	try {
		const user = auth.currentUser;
		if (user) {
			res.status(200);
			req.body.userId = user.uid;
			next();
		} else {
			// User is signed out
			res.status(401).send({
				error: { message: 'User is not logged in' },
			});
		}
	} catch (err) {
		if (err) {
			console.log('err:', err);
			res.status(500).send({
				error: {
					message: err,
				},
			});
		}
		res.status(500).send({
			error: { message: 'There was an issue connecting to the server' },
		});
		return;
	}
};

const createAuth = async (req, res, next) => {
	const { email, password, fname, lname } = req.body;
	if (email && password && fname && lname) {
		// Create new account
		try {
			// create account function
			await fireAuth
				.createUserWithEmailAndPassword(auth, email, password)
				.then(async (firebaseUser) => {
					const user = firebaseUser.user;
					const newUser = {
						_id: user.uid,
						username: '',
						fname,
						lname,
						email: user.email,
						githubUrl: '',
						jobTitle: '',
						bio: '',
						lastLoggedInDate: new Date(),
					};
					res.status(201);
					req.body.user = newUser;
					next();
				});
		} catch (err) {
			if (err) {
				if (err.code === 'auth/email-already-in-use') {
					res.status(401).send({
						error: { message: 'Email already in use' },
					});
					return;
				}
				res.status(500).send({
					error: {
						message: err,
					},
				});
			} else {
				res.status(500).send({
					error: 'There was an issue connecting to the server',
				});
			}
		}
	} else {
		res.status(400).send({
			error: {
				message:
					'You must enter all of the required fields to create an account.',
			},
		});
	}
};

const deleteAuth = async (req, res, next) => {
	const { userId } = req.body;
	if (userId) {
		try {
			const user = auth.currentUser;
			await fireAuth
				.deleteUser(user)
				.then((result) => {
					res.status(200).send({
						message: 'Successfully deleted user',
						result,
					});
				})
				.catch((err) => {
					console.log('delete auth err:', err);
					res.status(400).send({
						error: {
							message: err.message,
						},
					});
				});
		} catch (err) {
			if (err) {
				res.status(500).send({
					error: {
						message: err,
					},
				});
			} else {
				res.status(500).send({
					error: 'There was an issue while trying to delete the user from the database',
				});
			}
		}
	} else {
		res.status(400).send({
			error: {
				message: 'You must provide a userId to delete a user',
			},
		});
	}
};

const resetPassword = async (req, res) => {
	// TODO: Create reset password function
	await console.log('reset password');
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	if (email && password) {
		try {
			await fireAuth
				.signInWithEmailAndPassword(auth, email, password)
				.then(async (userCred) => {
					const user = userCred.user;
					const userCollection = await db('users');
					// TODO: Create route for creating a new user and inserting all of this.
					const newUser = await userCollection.findOne({
						_id: user.uid,
					});
					if (newUser) {
						const doc = { _id: newUser._id };
						const setter = {
							$set: {
								lastLoggedInDate: new Date(),
							},
						};
						const loginAndUpdate = await userCollection.updateOne(
							doc,
							setter,
						);
						if (loginAndUpdate) {
							res.status(200).send({
								message: 'Successfully logged in',
								result: loginAndUpdate,
								user: newUser,
							});
						} else {
							res.status(400).send({
								error: {
									message:
										'There was an issue logging in the user and updateing the last logged in date',
								},
							});
						}
					} else {
						res.status(401).send({
							error: {
								message: 'This is not a valid user',
							},
						});
					}
				})
				.catch((err) => {
					switch (err.code) {
						case 'auth/user-not-found':
							res.status(401).send({
								error: {
									message:
										'These credentials do not match any accounts in our records.',
								},
							});
						case 'auth/wrong-password':
							res.status(401).send({
								error: {
									message:
										'You have entered the wrong password. Please try again.',
								},
							});
						case 'auth/internal-error':
							res.status(401).send({
								error: {
									message:
										'Something went wrong. Please try again.',
								},
							});
						default:
							res.status(401).send({
								error: {
									message: err.message,
								},
							});
							break;
					}
				});
		} catch (err) {
			if (err) {
				res.status(400).send({
					error: {
						message: err.message,
					},
				});
			}
			res.status(400).send('Big issue with authentication');
		}
	} else {
		res.status(400).send('You must enter a valid email and password');
	}
};

const logout = async (req, res) => {
	try {
		await fireAuth
			.signOut(auth)
			.then(() => {
				res.status(200).send('Successfully logged out user');
			})
			.catch((err) => {
				res.status(400).send({
					error: {
						message: 'Something went wrong logging out',
					},
				});
			});
	} catch {
		res.status(500).send({
			error: {
				message: 'Something went wrong logging out',
			},
		});
	}
};

module.exports = {
	authCheck,
	login,
	createAuth,
	deleteAuth,
	resetPassword,
	logout,
};
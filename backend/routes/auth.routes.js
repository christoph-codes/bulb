const { fireAuth, auth } = require('../config/firebase');
const db = require('../config/mongodb');

const authCheck = async (req, res) => {
	try {
		fireAuth.onAuthStateChanged(auth, (user) => {
			if (user) {
				res.status(200).send(user.stsTokenManager);
			} else {
				// User is signed out
				res.status(401).send({
					error: { message: 'User is not logged in' },
				});
			}
		});
	} catch (err) {
		console.log('err:', err);
		res.status(500).send({
			error: { message: 'There was an issue connecting to the server' },
		});
	}
};

const createUser = async (req, res) => {
	const { email, password, fname, lname } = req.body;
	if (email && password && fname && lname) {
		// Create new account
		try {
			// create account function
			await fireAuth
				.createUserWithEmailAndPassword(auth, email, password)
				.then(async (firebaseUser) => {
					console.log('fbuser:', firebaseUser);
					const user = firebaseUser.user;
					const userCollection = await db('users');
					const newUser = await userCollection.insertOne({
						_id: user.uid,
						username: '',
						fname,
						lname,
						email: user.email,
						githubUrl: '',
						jobTitle: '',
						bio: '',
						lastLoggedInDate: new Date(),
					});
					res.status(200).send(newUser);
				});
		} catch (err) {
			res.status(500).send({
				error: {
					message: err.code,
				},
			});
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

const login = async (req, res) => {
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
					res.status(200).send(newUser);
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
			res.status(400).send('Big issue with authentication');
		}
	} else {
		res.status(400).send('You must enter a valid email and password');
	}
};

// Create get token call before all datbase calls from firebase

module.exports = { authCheck, login, createUser };

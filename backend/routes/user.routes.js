const db = require('../config/mongodb');

const createUser = async (req, res) => {
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

const getUser = async (req, res) => {
	const { userId } = req.body;
	if (!userId) {
		res.status(400).send({
			error: { message: 'You must enter a valid id' },
		});
	}
	try {
		// Hello
		const result = await db('users').findOne({
			_id: userId,
		});
		console.log(result);
		if (result) {
			res.status(200).send(result);
		} else {
			res.status(400).send({
				error: {
					message: 'There was an issue writing to the database.',
				},
			});
		}
	} catch (err) {
		if (err) {
			console.log(err);
			res.status(500).send({ error: { message: err.message } });
		}
		res.status(500).send({
			error: { message: 'There was an issue accessing the server' },
		});
	}
};

const updateUser = async (req, res) => {
	const { userId } = req.params;
	if (!userId) {
		res.status(400).send({ error: { message: 'No user found' } });
	}
	try {
		// updating user
		const results = await db('users').updateOne({
			_id: userId,
		});
		if (results) {
			console.log('results:', results);
			res.status(200).send(results);
		} else {
			res.status(400).send({ error: { message: 'No results found' } });
		}
	} catch (err) {
		// error trying to update the user
	}
};

module.exports = { createUser, getUser, updateUser };

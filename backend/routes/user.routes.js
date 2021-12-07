const { ObjectId } = require('mongodb');
const db = require('../config/mongodb');

const createUser = async (req, res) => {
	const { user } = req.body;
	if (user) {
		// continue creating the user
		try {
			const dbUsers = await db('users');
			const results = await dbUsers.insertOne(user);
			console.log('results:', results);
			if (results.acknowledged === true) {
				res.status(200).json({
					message: 'User created successfully',
					user: user,
				});
			} else {
				res.status(400).send({
					error: { message: 'No document was created.' },
				});
			}
		} catch (err) {
			if (err) {
				res.status(500).send({
					error: { message: err.message },
				});
			}
			res.status(500).send({
				error: {
					message:
						'There was an issue creating the user on the server',
				},
			});
		}
	} else {
		res.status(400).send({
			error: {
				message: 'A valid email is required to create a new user.',
			},
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
	const { userToken } = req.body;
	const { userId } = req.params; // Grabbing the user id from the path

	const doc = async () => {
		if (ObjectId.isValid(userId)) {
			return { _id: ObjectId(userId) }; // Grabbing the user document from Mongo
		} else {
			console.log('Invalid user id');
		}
	};
	console.log('doc:', doc());
	const { updates } = req.body; // An object of fields to be updated
	if (!userId) {
		res.status(400).send({ error: { message: 'No user found' } });
	}
	if (!userToken) {
		res.status(400).send({ error: { message: 'No user token found' } });
	}
	try {
		const dbUsers = await db('users');

		const setter = {
			$set: {
				...updates,
			},
		};
		// updating user
		const results = await dbUsers.updateOne(doc(), setter);
		console.log('results:', results);
		if (results.modifiedCount === 1) {
			console.log('results:', results);
			res.status(200).send('User updated successfully');
		} else {
			res.status(400).send({
				error: { message: 'No document was updated.' },
			});
		}
	} catch (err) {
		if (err) {
			res.status(500).send({ error: { message: err.message } });
		}
		res.status(500).send({
			error: {
				message:
					'Something went wrong trying to update the user document',
			},
		});
	}
};

module.exports = { createUser, getUser, updateUser };

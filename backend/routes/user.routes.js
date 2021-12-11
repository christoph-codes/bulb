const db = require('../config/mongodb');

const createUser = async (req, res, next) => {
	const { user } = req.body;
	if (user) {
		try {
			const dbUsers = await db('users');
			const results = await dbUsers.insertOne(user);
			if (results.insertedId) {
				res.status(201).send({
					message: 'User created successfully',
					user,
				});
			} else {
				res.status(400).send({
					userCreated: {
						message: 'User not created',
					},
					error: { message: 'No user was written to the database.' },
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
						'There was an issue creating the user on the server.',
				},
			});
			return;
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
		res.status(401).send({
			error: { message: 'A valid user id was not found' },
		});
	}
	try {
		const userCollection = await db('users');
		const result = await userCollection.findOne({
			_id: userId,
		});
		if (result) {
			res.status(200).send({
				message: 'User found',
				result: result,
			});
		} else {
			res.status(400).send({
				error: {
					message:
						'There was an issue grabbing the logged in user from the database',
				},
			});
		}
	} catch (err) {
		if (err) {
			console.log('get user catch err:', err);
			res.status(500).send({ error: { message: err } });
		}
		res.status(500).send({
			error: { message: 'There was an issue accessing the database' },
		});
		return;
	}
};

const updateUser = async (req, res) => {
	const { userId, updates } = req.body;

	const doc = userId && { _id: userId };
	if (!doc) {
		res.status(400).send({ error: { message: 'No user found' } });
		return;
	}
	try {
		const dbUsers = await db('users');
		const setter = {
			$set: {
				...updates,
			},
		};
		// updating user
		const results = await dbUsers.updateOne(doc, setter);
		if (results.modifiedCount === 1) {
			res.status(200).send({
				message: 'User updated successfully',
				result,
			});
		} else {
			res.status(400).send({
				error: { message: 'No document was updated.' },
			});
		}
	} catch (err) {
		if (err) {
			res.status(500).send({ error: { message: err.message } });
			return;
		}
		res.status(500).send({
			error: {
				message:
					'Something went wrong trying to update the user document',
			},
		});
	}
};

// TODO: Create a delete user route
const deleteUser = async (req, res) => {
	const { userId } = req.body;
	try {
		const usersCollection = await db('users');
		const result = await usersCollection.deleteOne({ _id: userId });
		if (result) {
			res.status(200).send({
				message: 'User deleted successfully',
				result,
			});
		} else {
			res.status(401).send({
				error: { message: 'User not found' },
			});
		}
	} catch (err) {
		if (err) {
			res.status(500).send({ error: { message: err.message } });
		}
		res.status(500).send({
			error: {
				message:
					'There was an issue deleting the user from the database',
			},
		});
		return;
	}
};

module.exports = { createUser, getUser, updateUser, deleteUser };

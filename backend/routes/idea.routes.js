const { ObjectId } = require('mongodb');
const db = require('../config/mongodb');
const getAllIdeas = async (req, res) => {
	try {
		const ideaCollection = await db('ideas');
		const result = await ideaCollection.find({}).toArray();
		res.status(200).send(result);
	} catch (err) {
		console.log(err, 'There was a database error');
		res.status(500).send({
			error: {
				message: err.message,
			},
		});
	}
};
const getUserIdeas = async (req, res) => {
	const { userId } = req.body;
	if (userId) {
		try {
			const ideaCollection = await db('ideas');
			const result = await ideaCollection
				.find({ ownerId: userId })
				.toArray();
			res.status(200).send(result);
		} catch (err) {
			res.status(500).send({
				error: {
					message: 'There was a database error',
				},
			});
		}
	} else {
		res.status(400).send({
			error: {
				message: 'No user has been declared to grab the user ideas.',
			},
		});
	}
};
const createIdea = async (req, res) => {
	const { userId } = req.body;
	const {
		name,
		description,
		desiredAudience,
		industry,
		firstThoughtDate,
		pitch,
		desiredDomain,
		officialDomain,
		notes,
		doubts,
		announcements,
		contributors,
		category,
		visibility,
	} = req.body.idea;
	if (!userId) {
		res.status(400).send({
			error: {
				message: 'Only valid users can create a new idea',
			},
		});
		return;
	}
	if (!description) {
		res.status(400).send({
			error: {
				message: 'You must enter a description for your idea.',
			},
		});
	} else {
		try {
			const newIdea = {
				name: name || '',
				description,
				slug: description.replace(/\s+/g, '-').toLowerCase(),
				desiredAudience: desiredAudience || '',
				industry: industry || '',
				firstThoughtDate: firstThoughtDate || new Date(),
				pitch: pitch || '',
				desiredDomain: desiredDomain || '',
				officialDomain: officialDomain || '',
				notes: notes || [],
				doubts: doubts || [],
				lastUpdated: new Date(),
				announcements: announcements || [],
				creationDate: new Date(),
				contributors: contributors || [],
				ownerId: userId,
				category: category || '',
				visibility: visibility || 'public',
			};

			try {
				const ideaCollection = await db('ideas');
				const result = await ideaCollection.insertOne(newIdea);
				if (result.insertedId) {
					res.status(200).send({
						message: 'Idea created successfully',
						result: result.insertedId,
					});
				} else {
					res.status(400).send({
						error: {
							message: 'Idea could not be created',
						},
					});
				}
			} catch (error) {
				console.log('error', error);
				res.status(500).send({
					error: {
						message: error.message,
					},
				});
			}
		} catch (err) {
			console.log('err', err);
			res.status(500).send({
				error: {
					message: err.message,
				},
			});
		}
	}
};
// Route to properly delete an idea from the database
const getIdea = async (req, res) => {
	const idea = req.params.ideaId;
	if (idea) {
		if (ObjectId.isValid(idea)) {
			try {
				const ideaCollection = await db('ideas');

				const result = await ideaCollection.findOne({
					_id: ObjectId(idea),
				});
				console.log('result', result);
				res.status(200).send(result);
			} catch (err) {
				res.status(500).send({
					error: {
						message: 'Something failed while accessing this record',
					},
				});
			}
		} else {
			res.status(400).send({
				error: {
					message: 'Invalid idea id',
				},
			});
		}
	} else {
		res.status(400).send({
			error: {
				message: 'You must provide a valid idea id',
			},
		});
	}
};
// Route to properly delete an idea from the database
const deleteIdea = async (req, res) => {
	const { userId } = req.body;
	const { ideaId } = req.params;
	if (!userId) {
		res.status(401).send({
			error: {
				message: 'You are not authorized to delete this idea',
			},
		});
	}
	if (!ideaId) {
		res.status(400).send({
			error: {
				message: 'You must provide a valid idea id',
			},
		});
	} else {
		if (!ObjectId.isValid(ideaId)) {
			res.status(401).send({
				error: {
					message: 'You are not authorized to delete this idea',
				},
			});
		}
	}
	try {
		const ideaCollection = await db('ideas');
		const result = await ideaCollection.deleteOne({
			_id: ObjectId(ideaId),
			ownerId: userId,
		});
		if (result.deletedCount === 0) {
			res.status(400).send({
				error: {
					message:
						'You are not the owner of this idea or the idea does not exist',
				},
			});
		} else {
			res.status(200).send({
				message: 'Idea deleted successfully',
			});
		}
	} catch (err) {
		res.status(500).send({
			error: {
				message: 'Something failed deleting this record',
			},
		});
	}
	return;
};
module.exports = { createIdea, getAllIdeas, getUserIdeas, deleteIdea, getIdea };

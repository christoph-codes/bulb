const ObjectId = require('mongodb').ObjectId;
const db = require('../config/mongodb');
const getAllIdeas = async (req, res) => {
	try {
		const ideaCollection = await db('ideas');
		const result = await ideaCollection.find({}).toArray();
		res.status(200).json(result);
	} catch (err) {
		console.log(err, 'There was a database error');
	}
};
const getUserIdeas = async (req, res) => {
	const userId = req.params.userId;
	if (userId) {
		try {
			const ideaCollection = await db('ideas');
			const result = await ideaCollection
				.find({ ownerId: userId })
				.toArray();
			res.status(200).json(result);
		} catch (err) {
			console.log(err, 'There was a database error');
		}
	} else {
		res.status(400).json({
			error: 'No user has been declared to grab the user ideas.',
		});
	}
};
const createIdea = async (req, res) => {
	const userId = req.params.userId;
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
	} = req.body;
	if (!userId) {
		res.status(400).send({
			error: 'Only valid users can create a new idea',
		});
	}
	if (!description) {
		res.status(400).send({
			error: 'You must enter a description for your idea.',
		});
	} else {
		try {
			const newIdea = {
				name: name || '',
				description,
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
			};

			try {
				const ideaCollection = await db('ideas');
				const result = await ideaCollection.insertOne(newIdea);
				res.send({ successful: result.acknowledged });
			} catch (error) {
				console.log('error', error);
			}
		} catch (err) {
			res.send({ status: 'This is broke' });
		}
	}
};
// Route to properly delete an idea from the database
const deleteIdea = async (req, res) => {
	const user = req.params.userId;
	const idea = req.params.ideaId;
	if (ObjectId.isValid(idea) && user) {
		try {
			const ideaCollection = await db('ideas');
			const result = await ideaCollection.deleteOne({
				_id: ObjectId(idea),
				ownerId: user,
			});
			if (result.deletedCount === 1) {
				res.status(400).send(
					'This record was not deleted. It may not exist in our database',
				);
			} else {
				res.status(200).send('Idea was successfully deleted.');
			}
		} catch (err) {
			res.status(500).send('Something failed deleting this record');
		}
	} else {
		res.status(400).send('You must include a idea id to properly delete');
	}
};
module.exports = { createIdea, getAllIdeas, getUserIdeas, deleteIdea };

const db = require('../config/mongodb');
const createIdea = async (req, res) => {
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
		ownerId,
		category,
	} = req.body;
	try {
		const newIdea = {
			name,
			description,
			desiredAudience,
			industry,
			firstThoughtDate: firstThoughtDate || new Date(),
			pitch,
			desiredDomain,
			officialDomain,
			notes,
			doubts,
			lastUpdated: new Date(),
			announcements,
			creationDate: new Date(),
			contributors,
			ownerId,
			category,
		};

		try {
			const ideaCollection = await db('ideas');
			console.log('ideaCollection', ideaCollection);
			const result = ideaCollection.insertOne(newIdea);
			res.send({ whatwegotback: result });
		} catch (error) {
			console.log('error', error);
		}
	} catch (err) {
		res.send({ status: 'This is broke' });
	}
};
module.exports = { createIdea };

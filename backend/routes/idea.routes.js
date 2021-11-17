const db = require('../config/mongodb');
const createIdea = async (req, res) => {
	try {
		const newIdea = {
			name: 'Bulb',
			description: '',
			desiredAudience: '',
			industry: '',
			firstThoughtDate: new Date(),
			pitch: '',
			desiredDomain: '',
			officialDomain: '',
			notes: [],
			doubts: [],
			lastUpdated: new Date(),
			announcements: [],
			creationDate: new Date(),
			contributors: [],
		};
		const result = await db('ideas').insertOne(newIdea);
		console.log(result);
		res.send({ status: 'Added a new idea' });
	} catch (err) {
		res.send({ status: err });
	}
};
module.exports = { createIdea };

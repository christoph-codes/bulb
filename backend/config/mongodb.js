const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

const db = async (collection) => {
	try {
		const client = await MongoClient.connect(process.env.MONGODB_URI);
		console.log(client);
		return client.db(process.env.MONGODB_NAME).collection(collection);
	} catch (error) {
		console.log(error);
	}
};

module.exports = db;

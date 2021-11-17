const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config({ path: '../.env' });

const db = async (collection) => {
	console.log('db:', process.env.MONGODB_URI);
	const client = await MongoClient.connect(process.env.MONGODB_URI);
	console.log(client);
	return client.db(process.env.MONGODB_DB).collection(collection);
};

module.exports = db;

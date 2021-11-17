const db = require('../config/mongodb');
const healthcheck = (req, res) => {
	try {
		console.log('Everything is healthy');
		res.send({ status: 'Everything is healthy' });
	} catch (err) {
		res.send({ status: 'Everything is NOT healthy' });
	}
};
module.exports = healthcheck;

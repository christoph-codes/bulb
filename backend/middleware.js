// Middleware for the backend
const addHeaders = (req, res, next) => {
	// Check development or not
	res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
	if (process.env.NODE_ENV === 'development') {
		res.header('Access-Control-Allow-Origin', '*');
	} else {
		res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
	}
	next();
};

module.exports = { addHeaders };

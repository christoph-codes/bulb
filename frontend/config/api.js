const axios = require('axios');

const BULB_API = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:5555'
			: process.env.NEXT_PUBLIC_BULB_API_URL,
});

export default BULB_API;

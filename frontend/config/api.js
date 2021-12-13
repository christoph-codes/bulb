const axios = require('axios');

const BULB_API = axios.create({
	baseURL: process.env.BULB_API_URL,
});

export default BULB_API;

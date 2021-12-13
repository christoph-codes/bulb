import BULB_API from '../../config/api';

const healtcheck = (req, res) => {
	try {
		BULB_API.get('/healthcheck')
			.then((response) => {
				const { data } = response;
				res.status(200).send(data.status);
			})
			.catch((error) => {
				res.status(500).send(error);
			});
	} catch (error) {
		res.status(500).send(error);
	}
};

export default healtcheck;

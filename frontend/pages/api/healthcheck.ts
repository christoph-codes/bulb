import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		res.status(200).send({ status: 'Everything is healthy' });
	} catch (err) {
		res.status(500).send({ status: 'Everything is NOT healthy' });
	}
};
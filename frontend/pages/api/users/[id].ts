import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../config/mongodb";

/**
 * Route to get a single user data
 */
export default async (req: NextApiRequest, res: NextApiResponse, next: any) => {
	const { id } = req.query;
	if (!id) {
		res.status(401).send({
			error: { message: 'A valid user id was not found' },
		});
	}
	try {
		const userCollection = await db('users');
		const result = await userCollection.findOne({
			_id: id,
		});
		if (result) {
			res.status(200).send({
				message: 'User found',
				result: result,
			});
		} else {
			res.status(400).send({
				error: {
					message:
						'There was an issue grabbing the logged in user from the database',
				},
			});
		}
	} catch (err) {
		if (err) {
			console.log('get user catch err:', err);
			res.status(500).send({ error: { message: err } });
		}
		res.status(500).send({
			error: { message: 'There was an issue accessing the database' },
		});
	}
};
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../config/mongodb";

/**
 * Route to delete a single user data
 */
export default async (req: NextApiRequest, res: NextApiResponse, next: any) => {
	const { id } = req.query;
	try {
		const usersCollection = await db('users');
		const result = await usersCollection.deleteOne({ _id: id });
		if (result) {
			res.status(200).send({
				message: 'User deleted successfully',
				result,
			});
		} else {
			res.status(401).send({
				error: { message: 'User not found' },
			});
		}
	} catch (err: any) {
		if (err) {
			res.status(500).send({ error: { message: err.message } });
		}
		res.status(500).send({
			error: {
				message:
					'There was an issue deleting the user from the database',
			},
		});
	}
};
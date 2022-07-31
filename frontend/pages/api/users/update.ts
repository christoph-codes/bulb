import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../config/mongodb";

/**
 * Route to update a single user data
 */
export default async (req: NextApiRequest, res: NextApiResponse, next: any) => {
	const { userId, updates } = req.body;

	const doc = userId && { _id: userId };
	if (!doc) {
		res.status(400).send({ error: { message: 'No user found' } });
		return;
	}
	try {
		const dbUsers = await db('users');
		const setter = {
			$set: {
				...updates,
			},
		};
		// updating user
		const results = await dbUsers.updateOne(doc, setter);
		if (results.modifiedCount === 1) {
			res.status(200).send({
				message: 'User updated successfully',
				results,
			});
		} else {
			res.status(400).send({
				error: { message: 'No document was updated.' },
			});
		}
	} catch (err: any) {
		if (err) {
			res.status(500).send({ error: { message: err.message } });
			return;
		}
		res.status(500).send({
			error: {
				message:
					'Something went wrong trying to update the user document',
			},
		});
	}
};
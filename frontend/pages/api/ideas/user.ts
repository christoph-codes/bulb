import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../config/mongodb";

/**
 * Route to request all of the ideas created by a single user.
 */
export default async (req: NextApiRequest, res: NextApiResponse, next: any) => {
	const { id } = req.body.user;
	try {
		const ideaCollection = await db('ideas');
		const result = await ideaCollection
			.find({ visibility: 'public', ownerId: id })
			.sort({ creationDate: -1 })
			.toArray();
		res.status(200).send({
			message: 'Ideas retrieved successfully',
			result,
		});
	} catch (err: any) {
		console.log(err, 'There was a database error');
		res.status(500).send({
			error: {
				message: err.message,
			},
		});
	}
};

import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../config/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse, next: any) => {
	try {
		const ideaCollection = await db('ideas');
		const result = await ideaCollection
			.find({ visibility: 'public' })
			.limit(25)
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

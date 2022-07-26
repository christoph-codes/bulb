import { NextApiRequest, NextApiResponse } from "next";
const { ObjectId } = require('mongodb');
import db from "../../../config/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const idea = req.query.id;
	if (idea) {
		if (ObjectId.isValid(idea)) {
			try {
				const ideaCollection = await db('ideas');

				const result = await ideaCollection.findOne({
					_id: ObjectId(idea),
				});
				console.log('result', result);
				res.status(200).send({
					message: 'Idea retrieved successfully',
					result,
				});
			} catch (err) {
				res.status(500).send({
					error: {
						message: 'Something failed while accessing this record',
					},
				});
			}
		} else {
			res.status(400).send({
				error: {
					message: 'Invalid idea id',
				},
			});
		}
	} else {
		res.status(400).send({
			error: {
				message: 'You must provide a valid idea id',
			},
		});
	}
};

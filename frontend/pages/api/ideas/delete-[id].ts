import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../config/mongodb";

type TIdeaId = {
	ideaId?: string;
}
/**
 * Route to properly delete an idea from the database
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { userId } = req.body;
	const { ideaId }: TIdeaId = req.query;
	if (!userId) {
		res.status(401).send({
			error: {
				message: 'You are not authorized to delete this idea',
			},
		});
	}
	if (!ideaId) {
		res.status(400).send({
			error: {
				message: 'You must provide a valid idea id',
			},
		});
	} else {
		if (!ObjectId.isValid(ideaId)) {
			res.status(401).send({
				error: {
					message: 'You are not authorized to delete this idea',
				},
			});
		}
	}
	try {
		const ideaCollection = await db('ideas');
		const result = await ideaCollection.deleteOne({
			_id: new ObjectId(ideaId),
			ownerId: userId,
		});
		if (result.deletedCount === 0) {
			res.status(400).send({
				error: {
					message:
						'You are not the owner of this idea or the idea does not exist',
				},
			});
		} else {
			res.status(200).send({
				message: 'Idea deleted successfully',
			});
		}
	} catch (err) {
		res.status(500).send({
			error: {
				message: 'Something failed deleting this record',
			},
		});
	}
	return;
};
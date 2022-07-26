import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../config/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse, next: any) => {
	const { userId } = req.body;
	const {
		name,
		description,
		desiredAudience,
		industry,
		firstThoughtDate,
		pitch,
		desiredDomain,
		officialDomain,
		notes,
		doubts,
		announcements,
		contributors,
		category,
		visibility,
	} = req.body.idea;
	if (!userId) {
		res.status(400).send({
			error: {
				message: 'Only valid users can create a new idea',
			},
		});
		return;
	}
	if (!description) {
		res.status(400).send({
			error: {
				message: 'You must enter a description for your idea.',
			},
		});
	} else {
		try {
			const newIdea = {
				name: name || '',
				description,
				slug: description.replace(/\s+/g, '-').toLowerCase(),
				desiredAudience: desiredAudience || '',
				industry: industry || '',
				firstThoughtDate: firstThoughtDate || new Date(),
				pitch: pitch || '',
				desiredDomain: desiredDomain || '',
				officialDomain: officialDomain || '',
				notes: notes || [],
				doubts: doubts || [],
				lastUpdated: new Date(),
				announcements: announcements || [],
				creationDate: new Date(),
				contributors: contributors || [],
				ownerId: userId,
				category: category || '',
				visibility: visibility || 'public',
			};

			try {
				const ideaCollection = await db('ideas');
				const result = await ideaCollection.insertOne(newIdea);
				if (result.insertedId) {
					res.status(201).send({
						message: 'Idea created successfully',
						result: result.insertedId,
					});
				} else {
					res.status(400).send({
						error: {
							message: 'Idea could not be created',
						},
					});
				}
			} catch (error: any) {
				console.log('error', error);
				res.status(500).send({
					error: {
						message: error.message,
					},
				});
			}
		} catch (err: any) {
			console.log('err', err);
			res.status(500).send({
				error: {
					message: err.message,
				},
			});
		}
	}
}
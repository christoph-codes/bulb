import { NextApiRequest, NextApiResponse } from "next";
import { deleteUser } from "firebase/auth";
import auth from "../../../config/firebase/firebaseClient";
export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const user = auth.currentUser;
		console.log("current user", user);
		if (user) {
			await deleteUser(user)
				.then((result) => {
					res.status(200).send({
						message: "Successfully deleted user",
						result,
					});
				})
				.catch((err) => {
					console.log("delete auth err:", err);
					res.status(400).send({
						error: {
							message: err.message,
						},
					});
				});
		}
	} catch (err) {
		if (err) {
			res.status(500).send({
				error: {
					message: err,
				},
			});
		} else {
			res.status(500).send({
				error: "There was an issue while trying to delete the user from the database",
			});
		}
	}
};

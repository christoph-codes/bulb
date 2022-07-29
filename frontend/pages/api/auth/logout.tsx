import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../../config/firebase/firebaseClient";
export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await auth
			.signOut()
			.then(() => {
				res.status(200).send({
					message: "Successfully logged out user",
				});
			})
			.catch((err) => {
				res.status(400).send({
					error: {
						message: "Something went wrong logging out",
					},
				});
			});
	} catch {
		res.status(500).send({
			error: {
				message: "Something went wrong logging out",
			},
		});
	}
};

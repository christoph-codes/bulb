import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../../config/firebase/firebaseClient";
import db from "../../../config/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse, next: any) => {
  // TODO: Create route for adding a user to mongodb
	const { user } = req.body;
  console.log("user", user);
};

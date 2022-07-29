import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// TODO: Create reset password function
	await console.log("reset password", req.body.email);
};

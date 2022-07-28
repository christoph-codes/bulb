import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../config/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse, next: any) => {
	const {user} = req.body;
  if (user) {
	  try {
		  const dbUsers = await db('users');
		  const results = await dbUsers.insertOne(user);
		  if (results.insertedId) {
			  res.status(201).send({
				  message: 'User created successfully',
				  user,
			  });
		  } else {
			  res.status(400).send({
				  error: { message: 'No user was written to the database.' },
			  });
		  }
	  } catch (err: any) {
		  if (err) {
			  res.status(500).send({
				  error: { message: err.message },
			  });
		  }
		  res.status(500).send({
			  error: {
				  message:
					  'There was an issue creating the user on the server.',
			  },
		  });
	  }
  } else {
	  res.status(400).send({
		  error: {
			  message: 'A valid email is required to create a new user.',
		  },
	  });
  }
};

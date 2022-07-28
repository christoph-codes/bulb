import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import auth from "../../../config/firebase/firebaseClient";
import db from "../../../config/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, username } = req.body.user;
  if (email && password && username) {
    // Create new account
    try {
      // create account function
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((cred: any) => {
          console.log("firebaseUser:", cred.user);
          const { user } = cred;
          const newUser = {
            _id: user.uid,
            username: username,
            email: user.email,
            githubUrl: "",
            jobTitle: "",
            bio: "",
            lastLoggedInDate: new Date(),
          };
          res.status(200).send({
            message: "Firebase User created successfully",
            user: newUser,
          });
        });
    } catch (err: any) {
      if (err) {
        if (err.code === "auth/email-already-in-use") {
          res.status(401).send({
            error: { message: "Email already in use" },
          });
          return;
        }
        res.status(500).send({
          error: {
            message: err,
          },
        });
      } else {
        res.status(500).send({
          error: "There was an issue connecting to the server",
        });
      }
    }
  } else {
    res.status(400).send({
      error: {
        message:
          "You must enter all of the required fields to create an account.",
      },
    });
  }
};

import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../../config/firebase/firebaseClient";
import db from "../../../config/mongodb";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  console.log("password", password);
  console.log("email", email);
  if (email && password) {
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(async (userCred: any) => {
          const user = userCred.user;
          const userCollection = await db("users");
          // TODO: Create route for creating a new user and inserting all of this.
          const newUser = await userCollection.findOne({
            _id: user.uid,
          });
          if (newUser) {
            const doc = { _id: newUser._id };
            const setter = {
              $set: {
                lastLoggedInDate: new Date(),
              },
            };
            const loginAndUpdate = await userCollection.updateOne(doc, setter);
            if (loginAndUpdate) {
              res.status(200).send({
                message: "Successfully logged in",
                result: loginAndUpdate,
                user: newUser,
              });
            } else {
              res.status(400).send({
                error: {
                  message:
                    "There was an issue logging in the user and updateing the last logged in date",
                },
              });
            }
          } else {
            res.status(401).send({
              error: {
                message: "This is not a valid user",
              },
            });
          }
        })
        .catch((err: any) => {
          switch (err.code) {
            case "auth/user-not-found":
              res.status(401).send({
                error: {
                  message:
                    "These credentials do not match any accounts in our records.",
                },
              });
            case "auth/wrong-password":
              res.status(401).send({
                error: {
                  message:
                    "You have entered the wrong password. Please try again.",
                },
              });
            case "auth/internal-error":
              res.status(401).send({
                error: {
                  message: "Something went wrong. Please try again.",
                },
              });
            case "auth/too-many-requests":
              res.status(401).send({
                error: {
                  message:
                    "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
                },
              });
            default:
              res.status(401).send({
                error: {
                  message: err.message,
                },
              });
              break;
          }
        });
    } catch (err: any) {
      if (err) {
        res.status(400).send({
          error: {
            message: err.message,
          },
        });
      }
      res.status(400).send("Big issue with authentication");
    }
  } else {
    res.status(400).send("You must enter a valid email and password");
  }
};

export default login;

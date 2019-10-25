import _ from "lodash";
import User from "./user";
import jwt from "jsonwebtoken";
import { SECRET } from "../../config/env";

export async function signUp(req, res) {
  try {
    let user = _.pick(req.body, "email", "password", "name");

    await User.findOne({ email: user.email }, (err, user) => {
      if (err) {
        return res.status(500).end();
      } else if (user) {
        return res.status(208).end();
      }
    });

    await User.create(user);

    return res.status(201).end();
  } catch (err) {
    res.status(500).end();
  }
}

export async function signIn(req, res) {
  try {
    await User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        return res.status(500).end();
      } else if (!user) {
        return res.status(400).end();
      }
      user.comparePassword(req.body.password, (err, equal) => {
        if (equal && !err) {
          const userData = _.pick(user, "name", "email");
          let token = jwt.sign(userData, SECRET, {
            expiresIn: 250000
          });
          return res.json({ user: userData, token: token });
        } else {
          return res.status(400).end();
        }
      });
    });
  } catch (err) {
    return res.status(500).end();
  }
}

export function isLoggedIn(req, res) {
  try {
    if ("authorization" in req.headers) {
      let bearer = req.headers["authorization"];
      let token = bearer.split(" ")[1];

      if (!token) {
        return res.status(403).send({
          auth: false,
          message: "No token provided"
        });
      } else {
        jwt.verify(token, SECRET, (err, tokenDecoded) => {
          if (err) {
            return res.status(401).json({
              error: err.name
            });
          }
          res.status(200).json({
            auth: true,
            message: "token successfully verified"
          });
        });
      }
    } else {
      return res.status(400).end();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}

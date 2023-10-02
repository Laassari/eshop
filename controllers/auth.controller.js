import { body, validationResult, matchedData } from "express-validator";
import { query } from "../db/index.js";
import { getUserByEmail } from "../models/user.js";
import { hashPassword, verifyPassword } from "../lib/password.js";

export const signupValidation = [
  body("email", "Invalid email").isEmail().isLength({ max: 100 }).exists(),
  body("password", "Invalid password").isLength({ max: 100, min: 6 }).exists(),
  body("full_name", "Invalid name").isLength({ max: 25, min: 4 }).exists(),
];

export async function signup(req, res, next) {
  const { email, password, full_name } = matchedData(req);
  const result = validationResult(req);
  let user;

  if (!result.isEmpty())
    return res.status(422).render("auth/signup", {
      errors: result.array({ onlyFirstError: true }),
    });

  try {
    const hashedPassword = await hashPassword(password);
    // TODO: what happens when mail already exist?
    const { rows } = await query(
      "INSERT INTO users (full_name, email, hashed_password) VALUES ($1, $2, $3) RETURNING *",
      [full_name, email, hashedPassword]
    );

    user = rows[0];
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  req.session.regenerate(function (err) {
    req.session.user = user;
    req.session.save(function (err) {
      if (err) next(err);

      res.redirect(req.query.redirect_to || "/");
    });
  });
}

export async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(401).send("User not found");
  }

  const passwordMatch = await verifyPassword(password, user.hashed_password);

  if (!passwordMatch) {
    return res.status(401).send("Passwrod incorrect");
  }

  req.session.regenerate(function (err) {
    req.session.user = user;
    req.session.save(function (err) {
      if (err) next(err);

      res.redirect(req.query.redirect_to || "/");
    });
  });
}

export async function signOut(req, res, next) {
  req.session.user = null;

  req.session.save(function (err) {
    if (err) next(err);

    res.sendStatus(200);
  });
}

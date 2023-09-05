import { body, validationResult, matchedData } from "express-validator";
import { query } from "../db/index.js";
import { hashPassword, verifyPassword } from "../lib/password.js";

export const signupValidation = [
  body("email", "Invalid email").isEmail().isLength({ max: 100 }).exists(),
  body("password", "Invalid password").isLength({ max: 100, min: 6 }).exists(),
];

export async function signup(req, res, next) {
  const { email, password } = matchedData(req);
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
      [email.split("@")[0], email, hashedPassword]
    );

    user = rows[0];
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  res.send({ user });
}

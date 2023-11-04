import { body, validationResult, matchedData } from "express-validator";
import User from "../models/user.js";

export const index = (req, res) => {
  res.render("profile/index");
};

export const updateUserInfoValidation = [
  body("email", "Invalid email").isEmail().isLength({ max: 100 }).exists(),
  body("fullName", "Invalid name").isLength({ max: 25, min: 4 }).exists(),
];

export const updateUserInfo = async (req, res, next) => {
  const { email, fullName } = matchedData(req);
  const result = validationResult(req);

  if (!result.isEmpty())
    return res.status(422).render("profile/index", {
      errors: result.array({ onlyFirstError: true }),
    });

  try {
    const user = await User.update(req.session.user.id, { email, fullName });

    req.session.user = user;
    res.render("profile/index", { user });
  } catch (error) {
    next(error);
  }
};

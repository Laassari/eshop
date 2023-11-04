import { body, validationResult, matchedData } from "express-validator";
import UserAddress from "../models/UserAddress.js";

export const index = (req, res) => {
  res.render("profile/index");
};

export const address = async (req, res, next) => {
  try {
    const userAddress = await UserAddress.findForUser(req.session.user.id);

    res.render("profile/address", { address: userAddress });
  } catch (error) {
    next(error);
  }
};

export const createValidation = [
  body("city", "City is required")
    .isString()
    .isLength({ max: 90, min: 3 })
    .exists(),
  body("zipCode", "Invalid ZipCode")
    .optional()
    .isAlphanumeric()
    .isLength({ max: 10 }),
  body("address", "Address is required").isLength({ max: 255 }).exists(),
];

export const createOrUpdate = async (req, res, next) => {
  const { city, zipCode, address } = matchedData(req);
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send(result.array({ onlyFirstError: true }));
  }

  try {
    const userAddress = await UserAddress.createOrUpdate({
      city,
      zipCode,
      address,
      userId: req.session.user.id,
    });

    res.render("profile/address", { address: userAddress });
  } catch (error) {
    next(error);
  }
};

import { matchedData, validationResult } from "express-validator";
import UserAddress from "../models/UserAddress.js";
import { createOrUpdateValidation } from "./address.controller.js";

export const index = async (req, res) => {
  const userAddress = await UserAddress.findForUser(req.session.user.id);

  res.render("cart/address", { address: userAddress });
};

export const createOrUpdate = async (req, res, next) => {
  const { city, zipCode, address } = matchedData(req);
  const result = validationResult(req);

  try {
    const userAddress = await UserAddress.createOrUpdate({
      city,
      zipCode,
      address,
      userId: req.session.user.id,
    });

    if (!result.isEmpty()) {
      return res.render("cart/address", {
        address: userAddress,
        errors: result.array({ onlyFirstError: true }),
      });
    }

    res.redirect("/cart/payment");
  } catch (error) {
    next(error);
  }
};

export { createOrUpdateValidation };

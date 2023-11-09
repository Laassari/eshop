import { sendEmail } from "./Email.js";

export const orderCreatedEmail = (sendTo, user, order) => {
  return sendEmail(
    sendTo,
    "Order confirmation from eShop",
    "order_created.html",
    {
      order,
      user,
    }
  );
};

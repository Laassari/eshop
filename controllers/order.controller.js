import OrderSingelton from "../models/Order.js";

export const indexForUser = async (req, res) => {
  const orders = await OrderSingelton.findForUser(req.session.user.id);

  res.render("profile/orders", { orders });
};

import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Event from "../models/Event.js";

import { orderSchema } from "../utilities/validation.js";

export default {
  async getShopItems(req, res, next) {
    const keys = ["name", "price", "variations"];
    const products = await Product.getAll(keys);
    return res.json({ products });
  },
  async placeOrder(req, res, next) {
    const { valid, message, data } = orderSchema(req.body);
    if (!valid) {
      return res.status(400).json({ message, status: 400 });
    }
    const event = await Event.findActive();
    if (!event) {
      return res.status(400).json({
        message:
          "Tut uns Leid, leider haben wir gerade keinen Verkauf am laufen.",
        status: 400,
      });
    }
    const order = await new Order(
      event._id.toString(),
      data.name,
      data.comments,
      data.items,
      data.paymentMethod,
      data.items.reduce((result, item) => {
        return result + item.price * item.quantity;
      }, 0)
    ).create();
    if (!order.acknowledged) {
      return res.status(400).json({
        message:
          "Tut uns Leid, wir konnten deine Bestellung leider nicht aufnehmen.",
        status: 400,
      });
    }
    return res.json({
      message: `Wir haben deine Bestellung erhalten, ${data.name}. Wir rufen dich, sobald dein Kaffee bereit ist, vielen Dank!`,
      status: 200,
    });
  },
};

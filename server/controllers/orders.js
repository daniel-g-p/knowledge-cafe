import Event from "../models/Event.js";
import Order from "../models/Order.js";

export default {
  async getPendingOrders(req, res, next) {
    const event = await Event.findActive();
    if (!event) {
      return res.status(200).json({
        message:
          "Aktuell werden keine Bestellungen entgegengenommen, da es kein aktives Event gibt.",
        status: 200,
      });
    }
    const orders = await Order.getPending(event._id.toString());
    return res.status(200).json({ orders });
  },
  async completeOrder(req, res, next) {
    const { orderId } = req.params;
    const order = await Order.complete(orderId);
    if (!order.acknowledged) {
      return res
        .status(400)
        .json({
          message: "Die Bestellung konnte nicht abgeschlossen werden.",
          status: 400,
        });
    }
    return res.status(200).json({ status: 200 });
  },
};

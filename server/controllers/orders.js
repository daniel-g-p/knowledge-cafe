import Event from "../models/Event.js";
import Order from "../models/Order.js";

export default {
  async getPendingOrders(req, res, next) {
    const event = await Event.findActive();
    if (!event) {
      return res.status(200).json({ event: false, status: 200 });
    }
    const orders = await Order.getPending(event._id.toString());
    return res.status(200).json({ orders, event: true });
  },
  async completeOrder(req, res, next) {
    const { orderId } = req.params;
    const order = await Order.completeById(orderId);
    if (!order.acknowledged) {
      return res.status(400).json({
        message: "Die Bestellung konnte nicht abgeschlossen werden.",
        status: 400,
      });
    }
    return res.status(200).json({ status: 200 });
  },
  async cancelOrder(req, res, next) {
    const { orderId } = req.params;
    const order = await Order.deleteById(orderId);
    console.log(order);
    return res.status(200).json({ status: 200 });
  },
};

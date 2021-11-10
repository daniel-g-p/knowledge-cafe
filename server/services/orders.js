import database from "../database/access.js";
import newOrder from "../models2/order.js";
import { condition, validate } from "./validation.js";

export default {
  validateOrder(order) {
    const { name, paymentMethod } = order;
    const nameValid = name ? true : false;
    const methods = ["cash", "card", "paypal"];
    const methodValid = paymentMethod && methods.includes(paymentMethod);
    return validate(
      order,
      condition(nameValid, "Bitte gebe deinen Namen an."),
      condition(methodValid, "Bitte wähle eine Zahlungsmethode.")
    );
  },
  async submitOrder(eventId, customerName, comments, items, paymentMethod) {
    const total = items.reduce((result, item) => {
      return result + item.price * item.quantity;
    }, 0);
    const order = newOrder(
      eventId,
      customerName,
      comments,
      items,
      paymentMethod,
      total
    );
    return await database.create("orders", order);
  },
};

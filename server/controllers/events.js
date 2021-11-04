import Event from "../models/Event.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export default {
  async getEvents(req, res, next) {
    const events = await Event.getAll();
    console.log(events);
    return res.status(200).json({
      events: events.sort((a, b) => {
        return a.start.getTime() < b.start.getTime() ? 1 : -1;
      }),
      status: 200,
    });
  },
  async startEvent(req, res, next) {
    const existingEvent = await Event.findActive();
    if (existingEvent) {
      return res.status(400).json({
        message:
          "Ein aktives Event existiert bereits, schließe dieses bitte ab um ein neues Event zu starten.",
        status: 400,
      });
    }
    await new Event().create();
    return res.status(200).json({ status: 200 });
  },
  async closeEvent(req, res, next) {
    const { eventName } = req.body;
    const activeEvent = await Event.findActive();
    if (!activeEvent) {
      return res.status(400).json({
        message:
          "Es konnte kein aktives Event gefunden werden, bitte versuche es erneut.",
        status: 400,
      });
    }
    const eventId = activeEvent._id.toString();
    const orders = await Order.findByEventId(eventId);
    if (orders.some((order) => !order.completed)) {
      return res.status(400).json({
        message: "Es gibt noch Bestellungen, die abgeschlossen werden müssen.",
        status: 400,
      });
    }
    const productTags = await helpers.computeProductTags(orders);
    const eventStats = helpers.computeStats(orders, productTags);
    await Event.closeEvent(eventId, eventName, eventStats);
    return res.status(200).json({ eventId, status: 200 });
  },
};

const helpers = {
  async computeProductTags(orders) {
    const productTags = {};
    for (let order of orders) {
      for (let item of order.items) {
        if (!productTags[item.id]) {
          const { tag } = await Product.getTagById(item.id);
          productTags[item.id] = tag;
        }
      }
    }
    return productTags;
  },
  computeStats(orders, productTags) {
    const revenue = orders.reduce((result, order) => {
      return result + order.total;
    }, 0);
    const unitsSold = orders.reduce((result, order) => {
      const orderUnits = order.items.reduce((count, item) => {
        return count + item.quantity;
      }, 0);
      return result + orderUnits;
    }, 0);
    const products = orders.reduce((result, order) => {
      const { items } = order;
      for (let item of items) {
        const tag = productTags[item.id];
        const tagValue = result[tag] || 0;
        result[tag] = tagValue + item.quantity;
      }
      return result;
    }, {});
    return {
      revenue,
      unitsSold,
      products,
    };
  },
};

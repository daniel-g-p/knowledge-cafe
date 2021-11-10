import database from "../database/access.js";
import { condition, validate } from "./validation.js";

export default {
  async findActiveEvent() {
    const events = await database.find("events", { end: null }, ["_id"]);
    return events[0];
  },
};

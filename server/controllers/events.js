import Event from "../models/Event.js";

export default {
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
    const event = await Event.findActive();
    if (!event) {
      return res.status(400).json({
        message:
          "Es konnte kein aktives Event gefunden werden, bitte versuche es erneut.",
        status: 400,
      });
    }
    return res.status(200).json({ status: 200 });
  },
};

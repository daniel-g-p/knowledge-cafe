import { newUserSchema } from "../utilities/validation.js";

import User from "../models/User.js";

export default {
  async getTeamMembers(req, res, next) {
    const fields = ["name", "username", "email", "role", "timestamp"];
    const team = await User.findVerified(fields);
    return res.status(200).json({ team, ok: true });
  },
  async setRole(req, res, next) {
    const { userId } = req.params;
    const { role } = req.body;
    await User.updateById(userId, { role });
    return res.status(200).json({ ok: true });
  },
  async deleteMember(req, res, next) {
    const { userId } = req.params;
    await User.deleteById(userId);
    return res.status(200).json({ ok: true });
  },
  async newUser(req, res, next) {
    const { valid, data, message } = newUserSchema(req.body);
    if (!valid) {
      return res.status(400).json({ ok: false, message });
    }
    const existingUser = await User.findByUser(data.email);
    if (existingUser) {
      const message = "Es gibt bereits einen Benutzer mit dieser Emailadresse.";
      return res.status(400).json({ ok: false, message });
    }
    let token = "";
    for (let i = 0; i < 6; i++) {
      token = `${token}${Math.floor(Math.random() * 10)}`;
    }
    await new User(data.email, token, data.role).create();
    return res.status(200).json({ ok: true });
  },
};

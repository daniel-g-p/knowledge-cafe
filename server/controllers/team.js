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
};

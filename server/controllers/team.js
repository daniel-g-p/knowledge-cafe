import User from "../models/User.js";

export default {
  async getTeamMembers(req, res, next) {
    const team = await User.findVerified(["name", "username", "email", "role", "timestamp"]);
    return res.status(200).json({ team, ok: true });
  },
};

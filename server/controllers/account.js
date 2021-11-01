import { hashPassword, verifyPassword } from "../utilities/encryption.js";
import { loginSchema } from "../utilities/validation.js";
import User from "../models/User.js";

export default {
  async login(req, res, next) {
    const { valid, message, data } = loginSchema(req.body);
    if (!valid) {
      return res.status(400).json({ message });
    }
    const user = await User.findByUser(data.user);
    if (!user) {
      return res.status(404).json({
        message:
          "Den Benutzer scheint es nicht zu geben, bitte überprüfe deine Eingabe.",
      });
    }
    const validPassword = await verifyPassword(user.password, data.password);
    if (!validPassword) {
      return res.status(401).json({
        message:
          "Der Benutzer und das Passwort stimmen nicht überein, bitte überprüfe deine Eingabe.",
      });
    }
    return res.json({ message: "Login successful", status: 200 });
  },
};
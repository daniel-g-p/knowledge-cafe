import dotenv from "dotenv";
import { hashPassword, verifyPassword } from "../utilities/encryption.js";
import { loginSchema, userEditsSchema } from "../utilities/validation.js";
import User from "../models/User.js";
import { signToken, verifyToken } from "../utilities/authentication.js";

dotenv.config();

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
    const secureEnvironment = process.env.NODE_ENV !== "development";
    return res
      .status(200)
      .cookie("userId", signToken(user._id.toString()), {
        maxAge: 1000 * 60 * 60 * 24,
        signed: true,
        httpOnly: true,
        secure: secureEnvironment,
      })
      .json({ status: 200 });
  },
  async verifyLogin(req, res, next) {
    const { userId } = verifyToken(req.signedCookies.userId);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized", status: 401 });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(401)
        .clearCookie("userId")
        .json({ message: "Unauthorized", status: 401 });
    }
    return res.status(200).json({ user, status: 200 });
  },
  async getUserData(req, res, next) {
    const { userId } = verifyToken(req.signedCookies.userId);
    const { name, email, username, role } = await User.findById(userId, [
      "name",
      "email",
      "username",
      "role",
    ]);
    console.log({ name, email, username, role });
    return res.status(200).json({ name, email, username, role, status: 200 });
  },
  async editUser(req, res, next) {
    const { userId } = verifyToken(req.signedCookies.userId);
    const { data, valid, message } = userEditsSchema(req.body);
    if (!valid) {
      return res.status(400).json({ message, status: 400 });
    }
    const existingUsername = await User.findByUser(data.username);
    if (existingUsername && existingUsername._id.toString() !== userId) {
      return res.status(400).json({
        message: `Der Benutzername "${data.username}"" ist bereits vergeben.`,
        status: 400,
      });
    }
    const existingEmail = await User.findByUser(data.email);
    if (existingEmail && existingEmail._id.toString() !== userId) {
      return res.status(400).json({
        message: `Es gibt bereits einen anderen Benutzer mit dieser Emailadresse.`,
        status: 400,
      });
    }
    console.log(data);
    await User.updateById(userId, data);
    return res.status(200).json({ status: 200 });
  },
};

import dotenv from "dotenv";
import { hashPassword, verifyPassword } from "../utilities/encryption.js";
import {
  userEditsSchema,
  changePasswordSchema,
} from "../utilities/validation.js";
import User from "../models/User.js";
import { verifyToken } from "../utilities/authentication.js";

import config from "../config/index.js";
import { verifyHash } from "../utilities2.js/passwords.js";
import { signJwtToken, verifyJwtToken } from "../utilities2.js/jwt.js";
import usersService from "../services/users.js";

dotenv.config();

export default {
  async login(req, res, next) {
    const { user, password } = req.body;
    const { valid, message, data } = usersService.validateLogin(user, password);
    if (!valid) {
      return res.status(400).json({ message });
    }
    const theUser = await usersService.findUserByLogin(data.user);
    if (!theUser) {
      const message = "Den Benutzer scheint es nicht zu geben.";
      return res.status(400).json({ message });
    }
    const validPassword = await verifyHash(theUser.password, data.password);
    if (!validPassword) {
      const message = "Benutzername und Passwort stimmen nicht überein.";
      return res.status(400).json({ message });
    }
    const jwtToken = signJwtToken(theUser._id.toString());
    const cookieOptions = {
      maxAge: 1000 * 60 * 60 * 24,
      signed: true,
      httpOnly: true,
      secure: config.nodeEnv !== "development",
    };
    return res
      .status(200)
      .cookie("userId", jwtToken, cookieOptions)
      .json({ ok: true });
  },
  async verifyLogin(req, res, next) {
    const { tokenData } = verifyJwtToken(req.signedCookies.userId);
    if (!tokenData) {
      return res.status(401).json({ message: "Kein Zugriff." });
    }
    const user = await usersService.findUserById(tokenData);
    if (!user) {
      const message = "Kein Zugriff.";
      return res.status(401).clearCookie("userId").json({ message });
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
    await User.updateById(userId, data);
    return res.status(200).json({ status: 200 });
  },
  async changePassword(req, res, next) {
    const { userId } = verifyToken(req.signedCookies.userId);
    const { valid, data, message } = changePasswordSchema(req.body);
    if (!valid) {
      return res.status(400).json({ message });
    }
    const user = await User.findById(userId, ["password"]);
    const correctPassword = await verifyPassword(
      user.password,
      data.oldPassword
    );
    if (!correctPassword) {
      const message = "Das eingegebene Passwort ist falsch.";
      return res.status(401).json({ message, ok: false });
    }
    const hash = await hashPassword(data.newPassword);
    await User.updateById(userId, { password: hash });
    return res.status(200).clearCookie("userId").json({ ok: true });
  },
  logout(req, res, next) {
    return res.clearCookie("userId").json({ ok: true });
  },
};

import database from "../database/access.js";
import { condition, validate } from "./validation.js";

export default {
  validateLogin(user, password) {
    const userValid = user ? true : false;
    const passwordValid = password ? true : false;
    return validate(
      { user, password },
      condition(
        userValid,
        "Bitte gebe deinen Benutzernamen oder deine Email an."
      ),
      condition(passwordValid, "Bitte gebe dein Passwort ein.")
    );
  },
  async findUserByLogin(login) {
    const query = { $or: [{ username: login }, { email: login }] };
    const users = await database.find("users", query, ["_id", "password"]);
    return users[0];
  },
  async findUserById(id) {
    return database.findById("users", id);
  },
};

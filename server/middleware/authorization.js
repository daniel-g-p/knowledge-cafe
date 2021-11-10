import { verifyJwtToken } from "../utilities2.js/jwt.js";
import usersService from "../services/users.js";

export const authorizeUser = async (req, res, next) => {
  const { tokenData } = verifyJwtToken(req.signedCookies.userId);
  const message = "Kein Zugriff.";
  if (!tokenData) {
    return res.status(401).json({ message });
  }
  const userExists = await usersService.userExists(tokenData);
  if (!userExists) {
    return res.status(401).clearCookie("userId").json({ message });
  }
  return next();
};

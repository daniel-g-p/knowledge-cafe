import { verifyJwtToken } from "../utilities/jwt.js";
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

export const authorizeAdmin = async (req, res, next) => {
  const { tokenData } = verifyJwtToken(req.signedCookies.userId);
  if (!tokenData) {
    return res.status(401).json({ message: "Kein Zugriff" });
  }
  const userIsAdmin = await usersService.userIsAdmin(tokenData);
  if (!userIsAdmin) {
    return res
      .status(401)
      .json({ message: "Dafür benötigst du Administratorrechte." });
  }
  next();
};

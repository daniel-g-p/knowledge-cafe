import { verifyToken } from "./authentication.js";
import { tryCatch } from "./error-handling.js";
import User from "../models/User.js";

export const authorizeUser = tryCatch(async (req, res, next) => {
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
  next();
});

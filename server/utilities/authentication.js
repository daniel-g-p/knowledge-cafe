import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const signToken = (userId) => {
  const options = { expiresIn: 60 * 60 * 24 };
  return jwt.sign({ userId }, process.env.JWT_SECRET, options);
};

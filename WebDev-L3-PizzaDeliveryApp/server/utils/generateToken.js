import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateJWT = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const generateRandomToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
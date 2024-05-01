import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv?.config();

export const generateJsonToken = (id: string) => {
  return jwt.sign({ id }, process?.env?.JWT_SECRET);
};

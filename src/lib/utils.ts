import crypto from "crypto"
import bcrypt from "bcrypt"

export const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export const SALT = bcrypt.genSaltSync(10);

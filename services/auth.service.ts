import { Request, Response } from "express";
import { prisma } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SALT } from "../lib/utils";
import { User } from "@prisma/client";

export class AuthService {
  /**
   * Registers a user in the database using the name and password from the request body
   * @returns
   */
  register = async (req: Request, res: Response): Promise<User | undefined> => {
    const { name, password } = req.body;
    const existingUser = await prisma.user.findFirst({
      where: { name: name },
    });
    const hashedPassword = bcrypt.hashSync(password, SALT);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const registrationDate = new Date();
    const result = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        registrationDate: registrationDate,
      },
    });

    return result;
  };

  login = async (req: Request, res: Response): Promise<string | undefined> => {
    const { name, password } = req.body;

    const validUser = await prisma.user.findFirst({
      where: {
        name, // Use the name to locate the user
      },
    });

    if (!validUser) {
      throw new Error("Invalid user");
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      {
        id: validUser.id,
        name: validUser.name,
        role: validUser.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 3600,
      }
    );

    return token;
  };
}
